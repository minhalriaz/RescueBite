<?php

namespace App\Http\Controllers;

use App\Models\Donation;
use App\Models\RescueNotification;
use App\Models\RescueRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class DonorController extends Controller
{
    public function myDonations(Request $request): JsonResponse
    {
        $user = $request->user();

        $recent = Donation::query()
            ->where('user_id', $user->id)
            ->where('is_demo', false)
            ->with(['rescueRequests' => fn ($query) => $query->latest()->limit(1)])
            ->orderByDesc('created_at')
            ->limit(10)
            ->get()
            ->map(fn (Donation $d) => [
                'id' => $d->id,
                'food' => $d->food,
                'quantity' => $d->quantity,
                'beneficiary_type' => $d->beneficiary_type,
                'status' => $d->status,
                'address' => $d->address,
                'pickup_deadline' => $d->pickup_deadline?->toIso8601String(),
                'request_status' => $d->rescueRequests->first()?->status,
            ]);

        $donations = Donation::query()->where('user_id', $user->id)->where('is_demo', false)->get();
        $stats = (object) [
            'active' => $donations->whereIn('status', ['available', 'requested', 'ready_for_pickup'])->count(),
            'completed' => $donations->where('status', 'completed')->count(),
            'pending' => RescueRequest::whereIn('donation_id', $donations->pluck('id'))->where('status', 'pending')->count(),
            'ngos_reached' => RescueRequest::whereIn('donation_id', $donations->pluck('id'))->distinct('ngo_id')->count('ngo_id'),
        ];

        return response()->json([
            'data' => $recent,
            'stats' => [
                'active' => (int) ($stats->active ?? 0),
                'completed' => (int) ($stats->completed ?? 0),
                'pending' => (int) ($stats->pending ?? 0),
                'ngos_reached' => (int) ($stats->ngos_reached ?? 0),
            ],
        ]);
    }
}
