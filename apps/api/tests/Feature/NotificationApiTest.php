<?php

namespace Tests\Feature;

use App\Models\Donation;
use App\Models\RescueNotification;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Hash;
use Tests\TestCase;

class NotificationApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_ngo_can_retrieve_mark_one_and_mark_all_notifications_as_read(): void
    {
        $donor = $this->user('donor@test.local', 'donor', null, 'donor-token');
        $ngo = $this->user('ngo@test.local', 'ngo', 'both', 'ngo-token');
        $otherNgo = $this->user('other@test.local', 'ngo', 'both', 'other-token');

        $donationA = $this->donation($donor, 'Meal A');
        $donationB = $this->donation($donor, 'Meal B');

        $first = $this->notification($ngo, $donationA);
        $second = $this->notification($ngo, $donationB);
        $other = $this->notification($otherNgo, $donationA);

        $this->withToken('ngo-token')
            ->getJson('/api/notifications')
            ->assertOk()
            ->assertJsonPath('unread_count', 2)
            ->assertJsonCount(2, 'data');

        $this->withToken('ngo-token')
            ->patchJson("/api/notifications/{$first->id}/read")
            ->assertOk()
            ->assertJsonPath('notification.id', $first->id);

        $this->assertNotNull($first->fresh()->read_at);
        $this->assertNull($second->fresh()->read_at);

        $this->withToken('ngo-token')
            ->patchJson("/api/notifications/{$other->id}/read")
            ->assertNotFound();

        $this->withToken('ngo-token')
            ->patchJson('/api/notifications/read-all')
            ->assertOk()
            ->assertJsonPath('unread_count', 0);

        $this->assertNotNull($second->fresh()->read_at);
    }

    private function user(string $email, string $role, ?string $preference, string $token): User
    {
        return User::create([
            'name' => $email,
            'email' => $email,
            'password' => Hash::make('password'),
            'role' => $role,
            'beneficiary_preference' => $preference,
            'api_token_hash' => hash('sha256', $token),
        ]);
    }

    private function donation(User $donor, string $food): Donation
    {
        return Donation::create([
            'user_id' => $donor->id,
            'food' => $food,
            'quantity' => '10 servings',
            'beneficiary_type' => 'human',
            'pickup_deadline' => now()->addHours(4),
            'address' => 'Dhaka',
            'status' => 'available',
        ]);
    }

    private function notification(User $ngo, Donation $donation): RescueNotification
    {
        return RescueNotification::create([
            'user_id' => $ngo->id,
            'donation_id' => $donation->id,
            'type' => 'donation_available',
            'title' => 'New food donation available',
            'message' => 'Demo notification',
            'data' => ['donation_id' => $donation->id],
        ]);
    }
}
