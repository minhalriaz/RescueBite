<?php

namespace App\Services;

use App\Models\Donation;
use App\Models\RescueNotification;
use App\Models\User;

class DonationNotificationService
{
    public function notifyMatchingNgos(Donation $donation): int
    {
        $created = 0;

        User::query()
            ->where('role', 'ngo')
            ->whereIn('beneficiary_preference', [$donation->beneficiary_type, 'both'])
            ->orderBy('id')
            ->chunkById(100, function ($ngos) use ($donation, &$created): void {
                foreach ($ngos as $ngo) {
                    $timestamp = now();
                    $inserted = RescueNotification::query()->insertOrIgnore([
                        'user_id' => $ngo->id,
                        'donation_id' => $donation->id,
                        'type' => 'donation_available',
                        'title' => 'New food donation available',
                        'message' => $this->buildMessage($donation),
                        'data' => json_encode([
                            'donation_id' => $donation->id,
                            'food' => $donation->food,
                            'quantity' => $donation->quantity,
                            'beneficiary_type' => $donation->beneficiary_type,
                            'pickup_deadline' => $donation->pickup_deadline?->toIso8601String(),
                            'address' => $donation->address,
                        ], JSON_THROW_ON_ERROR),
                        'created_at' => $timestamp,
                        'updated_at' => $timestamp,
                    ]);

                    $created += $inserted;
                }
            });

        return $created;
    }

    private function buildMessage(Donation $donation): string
    {
        $beneficiary = ucfirst($donation->beneficiary_type);
        $deadline = $donation->pickup_deadline?->format('g:i A') ?? 'Not specified';

        return "New food donation available near your service area.\n\n"
            ."Food: {$donation->food}\n"
            ."Quantity: {$donation->quantity}\n"
            ."Beneficiary: {$beneficiary}\n"
            ."Pickup deadline: {$deadline}";
    }
}
