<?php

namespace App\Http\Controllers;

use App\Models\Donation;
use App\Services\DonationNotificationService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rule;

class DonationController extends Controller
{
    public function store(Request $request, DonationNotificationService $notificationService): JsonResponse
    {
        $user = $request->user();

        if ($user->role !== 'donor') {
            return response()->json(['message' => 'Only donor accounts can create donations.'], 403);
        }

        $validated = $request->validate([
            'food' => ['required', 'string', 'max:190'],
            'quantity' => ['required', 'string', 'max:120'],
            'beneficiary_type' => ['required', Rule::in(['human', 'animal'])],
            'pickup_deadline' => ['required', 'date', 'after:now'],
            'address' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string', 'max:2000'],
        ]);

        [$donation, $notificationCount] = DB::transaction(function () use ($user, $validated, $notificationService) {
            $donation = Donation::create([
                ...$validated,
                'user_id' => $user->id,
                'status' => 'available',
            ]);

            $notificationCount = $notificationService->notifyMatchingNgos($donation);

            return [$donation, $notificationCount];
        });

        return response()->json([
            'message' => 'Food donation created successfully.',
            'donation' => $donation,
            'notifications_created' => $notificationCount,
        ], 201);
    }
}
