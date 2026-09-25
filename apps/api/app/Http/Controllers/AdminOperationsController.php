<?php

namespace App\Http\Controllers;

use App\Models\ActivityLog;
use App\Models\ContentReport;
use App\Models\Donation;
use App\Models\PickupTask;
use App\Models\RescueRequest;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rule;

class AdminOperationsController extends Controller
{
    public function donors(): JsonResponse
    {
        $donors = User::query()->where('role', 'donor')->withCount('donations')->latest()->get([
            'id', 'name', 'email', 'phone', 'approval_status', 'created_at',
        ]);

        return response()->json(['donors' => $donors]);
    }

    public function donations(): JsonResponse
    {
        $donations = Donation::query()->with([
            'donor:id,name,email',
            'rescueRequests.ngo:id,name',
            'rescueRequests.pickupTask.volunteer:id,name',
        ])->latest()->get()->map(fn (Donation $donation) => [
            'id' => $donation->id,
            'food' => $donation->food,
            'quantity' => $donation->quantity,
            'address' => $donation->address,
            'status' => $donation->status,
            'pickup_deadline' => $donation->pickup_deadline?->toIso8601String(),
            'donor' => $donation->donor?->name,
            'request' => optional($donation->rescueRequests->sortByDesc('id')->first(), function ($item): array {
                return [
                    'status' => $item->status,
                    'ngo' => $item->ngo?->name,
                    'volunteer' => $item->pickupTask?->volunteer?->name,
                ];
            }),
        ]);

        return response()->json(['donations' => $donations]);
    }

    public function requests(): JsonResponse
    {
        $requests = RescueRequest::query()->with([
            'donation.donor:id,name', 'ngo:id,name', 'pickupTask.volunteer:id,name',
        ])->latest()->get()->map(fn (RescueRequest $item) => [
            'id' => $item->id,
            'status' => $item->status,
            'food' => $item->donation?->food,
            'quantity' => $item->donation?->quantity,
            'address' => $item->donation?->address,
            'donor' => $item->donation?->donor?->name,
            'ngo' => $item->ngo?->name,
            'volunteer' => $item->pickupTask?->volunteer?->name,
            'pickup_status' => $item->pickupTask?->status,
        ]);

        return response()->json(['requests' => $requests]);
    }

    public function reviewRequest(Request $request, int $id, string $decision): JsonResponse
    {
        abort_unless(in_array($decision, ['approve', 'reject'], true), 404);
        $validated = $request->validate(['review_note' => ['nullable', 'string', 'max:2000']]);

        $item = DB::transaction(function () use ($request, $id, $decision, $validated): RescueRequest {
            $item = RescueRequest::query()->with('donation')->lockForUpdate()->findOrFail($id);
            if ($item->status === 'approved' && $decision === 'approve') {
                $task = PickupTask::firstOrCreate(
                    ['rescue_request_id' => $item->id],
                    ['status' => 'available'],
                );

                if ($item->donation->status !== 'completed') {
                    $item->donation->update(['status' => 'ready_for_pickup']);
                }

                return $item;
            }

            abort_if($item->status !== 'pending', 422, 'This request has already been reviewed.');

            $approved = $decision === 'approve';
            $item->forceFill([
                'status' => $approved ? 'approved' : 'rejected',
                'reviewed_by' => $request->user()->id,
                'reviewed_at' => now(),
                'review_note' => $validated['review_note'] ?? null,
            ])->save();

            if ($approved) {
                PickupTask::firstOrCreate(
                    ['rescue_request_id' => $item->id],
                    ['status' => 'available'],
                );
                $item->donation->update(['status' => 'ready_for_pickup']);
            } else {
                $item->donation->update(['status' => 'available']);
            }

            ActivityLog::create([
                'actor_id' => $request->user()->id,
                'action' => 'donation_request_'.($approved ? 'approved' : 'rejected'),
                'entity_type' => RescueRequest::class,
                'entity_id' => $item->id,
                'metadata' => ['review_note' => $validated['review_note'] ?? null],
            ]);

            return $item;
        });

        return response()->json(['message' => 'Request '.($decision === 'approve' ? 'approved' : 'rejected').'.', 'request' => $item->fresh()->load(['donation', 'ngo', 'pickupTask'])]);
    }

    public function reports(): JsonResponse
    {
        $donations = Donation::query()->select('id', 'status', 'created_at')->get();
        $byMonth = $donations->groupBy(fn (Donation $item) => $item->created_at->format('Y-m'))->map(fn ($items, $month) => [
            'month' => $month,
            'donations' => $items->count(),
            'completed' => $items->where('status', 'completed')->count(),
        ])->values();

        return response()->json([
            'stats' => [
                'donations' => $donations->count(),
                'completed' => $donations->where('status', 'completed')->count(),
                'pending_requests' => RescueRequest::where('status', 'pending')->count(),
                'open_reports' => ContentReport::whereIn('status', ['open', 'reviewing'])->count(),
            ],
            'trend' => $byMonth,
        ]);
    }

    public function activity(): JsonResponse
    {
        $logs = ActivityLog::query()->with('actor:id,name')->latest()->limit(100)->get()->map(fn (ActivityLog $log) => [
            'id' => $log->id,
            'action' => $log->action,
            'actor' => $log->actor?->name ?? 'System',
            'entity_type' => $log->entity_type,
            'entity_id' => $log->entity_id,
            'metadata' => $log->metadata,
            'created_at' => $log->created_at?->toIso8601String(),
        ]);

        return response()->json(['activities' => $logs]);
    }

    public function reportsContent(): JsonResponse
    {
        $reports = ContentReport::query()->with(['reporter:id,name', 'reviewer:id,name'])->latest()->get();
        return response()->json(['reports' => $reports]);
    }

    public function resolveReport(Request $request, int $id): JsonResponse
    {
        $validated = $request->validate([
            'status' => ['required', Rule::in(['reviewing', 'resolved', 'dismissed'])],
            'resolution_note' => ['nullable', 'string', 'max:2000'],
        ]);
        $report = ContentReport::findOrFail($id);
        $report->forceFill([
            ...$validated,
            'reviewed_by' => $request->user()->id,
            'reviewed_at' => now(),
        ])->save();

        return response()->json(['report' => $report->fresh()->load(['reporter:id,name', 'reviewer:id,name'])]);
    }
}
