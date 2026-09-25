<?php

namespace Tests\Feature;

use App\Models\Donation;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Hash;
use Tests\TestCase;

class DonationCreationTest extends TestCase
{
    use RefreshDatabase;

    public function test_donor_can_create_a_donation_and_its_fields_are_persisted(): void
    {
        $donor = $this->user('donor', 'donor-token');
        $deadline = now()->addHours(4)->toIso8601String();

        $response = $this->withToken('donor-token')->postJson('/api/donations', [
            ...$this->validPayload(),
            'pickup_deadline' => $deadline,
            'description' => 'Keep refrigerated',
            'user_id' => 999,
            'status' => 'collected',
            'is_demo' => true,
        ]);

        $response->assertCreated()->assertJsonPath('notifications_created', 0);
        $donation = Donation::findOrFail($response->json('donation.id'));

        $this->assertSame($donor->id, $donation->user_id);
        $this->assertSame('available', $donation->status);
        $this->assertFalse($donation->is_demo);
        $this->assertSame('Cooked meals', $donation->food);
        $this->assertSame('10 servings', $donation->quantity);
        $this->assertSame('human', $donation->beneficiary_type);
        $this->assertSame('Dhanmondi, Dhaka', $donation->address);
        $this->assertSame('Keep refrigerated', $donation->description);
        $this->assertSame(strtotime($deadline), $donation->pickup_deadline->timestamp);
        $this->assertDatabaseCount('donations', 1);
    }

    public function test_missing_required_fields_return_validation_errors_without_creating_a_donation(): void
    {
        $this->user('donor', 'donor-token');

        $this->withToken('donor-token')->postJson('/api/donations', [])
            ->assertUnprocessable()
            ->assertJsonValidationErrors(['food', 'quantity', 'beneficiary_type', 'pickup_deadline', 'address']);

        $this->assertDatabaseCount('donations', 0);
    }

    public function test_invalid_fields_are_rejected_without_creating_a_donation(): void
    {
        $this->user('donor', 'donor-token');

        $this->withToken('donor-token')->postJson('/api/donations', [
            'food' => str_repeat('a', 191),
            'quantity' => ['10 servings'],
            'beneficiary_type' => 'unknown',
            'pickup_deadline' => now()->subMinute()->toIso8601String(),
            'address' => str_repeat('a', 256),
            'description' => str_repeat('a', 2001),
        ])->assertUnprocessable()->assertJsonValidationErrors([
            'food', 'quantity', 'beneficiary_type', 'pickup_deadline', 'address', 'description',
        ]);

        $this->withToken('donor-token')->postJson('/api/donations', [
            ...$this->validPayload(),
            'pickup_deadline' => 'not a date',
        ])->assertUnprocessable()->assertJsonValidationErrors(['pickup_deadline']);

        $this->assertDatabaseCount('donations', 0);
    }

    public function test_non_donor_cannot_create_a_donation(): void
    {
        $this->user('ngo', 'ngo-token');

        $this->withToken('ngo-token')->postJson('/api/food-donations', $this->validPayload())
            ->assertForbidden();

        $this->assertDatabaseCount('donations', 0);
    }

    private function validPayload(): array
    {
        return [
            'food' => 'Cooked meals',
            'quantity' => '10 servings',
            'beneficiary_type' => 'human',
            'pickup_deadline' => now()->addHours(4)->toIso8601String(),
            'address' => 'Dhanmondi, Dhaka',
        ];
    }

    private function user(string $role, string $token): User
    {
        return User::create([
            'name' => 'Test User',
            'email' => $role.'@test.local',
            'password' => Hash::make('password'),
            'role' => $role,
            'beneficiary_preference' => $role === 'ngo' ? 'both' : null,
            'api_token_hash' => hash('sha256', $token),
        ]);
    }
}
