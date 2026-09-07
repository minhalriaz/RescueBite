<?php

namespace App\Http\Controllers;

use App\Models\Donation;
use App\Models\RescueNotification;
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
            ]);

        $stats = DB::table('donations')
            ->where('user_id', $user->id)
            ->where('is_demo', false)
            ->selectRaw("
                COUNT(CASE WHEN status = 'available' THEN 1 END) as active,
                COUNT(CASE WHEN status = 'collected' THEN 1 END) as completed,
                COUNT(CASE WHEN status = 'requested' THEN 1 END) as pending,
                COUNT(DISTINCT (SELECT COUNT(DISTINCT user_id) FROM notifications WHERE donation_id = donations.id)) as ngos_reached
            ")
            ->first();

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
