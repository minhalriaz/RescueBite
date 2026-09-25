<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\ActivityLog;
use App\Models\Donation;
use App\Models\RescueRequest;
use App\Models\PickupTask;
use App\Models\ContentReport;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AdminController extends Controller
{
    public function dashboard(): JsonResponse
    {
        return response()->json([
            'stats' => [
                'total_donors' => User::where('role', 'donor')->count(),
                'total_ngos' => User::where('role', 'ngo')->count(),
                'total_volunteers' => User::where('role', 'volunteer')->count(),
                'active_donations' => Donation::whereIn('status', ['available', 'requested', 'ready_for_pickup'])->count(),
                'completed_rescues' => RescueRequest::where('status', 'completed')->count(),
                'meals_shared' => $this->mealCount(),
                'pending_requests' => RescueRequest::where('status', 'pending')->count(),
                'open_reports' => ContentReport::whereIn('status', ['open', 'reviewing'])->count(),
            ],
            'pending' => [
                'ngos' => User::where('role', 'ngo')
                    ->where('approval_status', 'pending')
                    ->count(),

                'volunteers' => User::where('role', 'volunteer')
                    ->where('approval_status', 'pending')
                    ->count(),
                'requests' => RescueRequest::where('status', 'pending')->count(),
            ],
        ]);
    }

    public function ngos(): JsonResponse
    {
        $ngos = User::query()
            ->where('role', 'ngo')
            ->orderByDesc('created_at')
            ->get([
                'id',
                'name',
                'email',
                'phone',
                'service_area',
                'beneficiary_preference',
                'approval_status',
                'approved_at',
                'created_at',
            ]);

        return response()->json([
            'ngos' => $ngos,
        ]);
    }

    public function approveNgo(int $id): JsonResponse
    {
        $ngo = User::query()
            ->where('id', $id)
            ->where('role', 'ngo')
            ->first();

        if (! $ngo) {
            return response()->json([
                'message' => 'NGO not found.',
            ], 404);
        }

        $ngo->forceFill([
            'approval_status' => 'approved',
            'approved_at' => now(),
        ])->save();

        ActivityLog::create([
            'actor_id' => request()->user()->id,
            'action' => 'ngo_approved',
            'entity_type' => User::class,
            'entity_id' => $ngo->id,
        ]);

        return response()->json([
            'message' => 'NGO approved successfully.',
            'ngo' => $ngo->fresh(),
        ]);
    }

    public function rejectNgo(int $id): JsonResponse
    {
        $ngo = User::query()
            ->where('id', $id)
            ->where('role', 'ngo')
            ->first();

        if (! $ngo) {
            return response()->json([
                'message' => 'NGO not found.',
            ], 404);
        }

        $ngo->forceFill([
            'approval_status' => 'rejected',
            'approved_at' => null,
        ])->save();

        ActivityLog::create([
            'actor_id' => request()->user()->id,
            'action' => 'ngo_rejected',
            'entity_type' => User::class,
            'entity_id' => $ngo->id,
        ]);

        return response()->json([
            'message' => 'NGO rejected successfully.',
            'ngo' => $ngo->fresh(),
        ]);
    }

    public function volunteers(): JsonResponse
    {
        $volunteers = User::query()
            ->where('role', 'volunteer')
            ->orderByDesc('created_at')
            ->get([
                'id',
                'name',
                'email',
                'phone',
                'service_area',
                'approval_status',
                'approved_at',
                'created_at',
            ]);

        return response()->json([
            'volunteers' => $volunteers,
        ]);
    }

    public function approveVolunteer(int $id): JsonResponse
    {
        $volunteer = User::query()
            ->where('id', $id)
            ->where('role', 'volunteer')
            ->first();

        if (! $volunteer) {
            return response()->json([
                'message' => 'Volunteer not found.',
            ], 404);
        }

        $volunteer->forceFill([
            'approval_status' => 'approved',
            'approved_at' => now(),
        ])->save();

        ActivityLog::create([
            'actor_id' => request()->user()->id,
            'action' => 'volunteer_approved',
            'entity_type' => User::class,
            'entity_id' => $volunteer->id,
        ]);

        return response()->json([
            'message' => 'Volunteer approved successfully.',
            'volunteer' => $volunteer->fresh(),
        ]);
    }

    public function rejectVolunteer(int $id): JsonResponse
    {
        $volunteer = User::query()
            ->where('id', $id)
            ->where('role', 'volunteer')
            ->first();

        if (! $volunteer) {
            return response()->json([
                'message' => 'Volunteer not found.',
            ], 404);
        }

        $volunteer->forceFill([
            'approval_status' => 'rejected',
            'approved_at' => null,
        ])->save();

        ActivityLog::create([
            'actor_id' => request()->user()->id,
            'action' => 'volunteer_rejected',
            'entity_type' => User::class,
            'entity_id' => $volunteer->id,
        ]);

        return response()->json([
            'message' => 'Volunteer rejected successfully.',
            'volunteer' => $volunteer->fresh(),
        ]);
    }

    private function mealCount(): int
    {
        return Donation::query()
            ->whereIn('status', ['collected', 'completed'])
            ->pluck('quantity')
            ->sum(function (string $quantity): int {
                return (int) preg_replace('/[^0-9]/', '', $quantity);
            });
    }
}