<?php

namespace Tests\Feature;

use App\Models\Donation;
use App\Models\User;
use App\Services\DonationNotificationService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Hash;
use Tests\TestCase;

class DonationNotificationTest extends TestCase
{
    use RefreshDatabase;

    public function test_human_and_animal_donations_notify_only_matching_ngos(): void
    {
        $donor = $this->user('donor@test.local', 'donor', null, 'donor-token');
        $human = $this->user('human@test.local', 'ngo', 'human', 'human-token');
        $animal = $this->user('animal@test.local', 'ngo', 'animal', 'animal-token');
        $both = $this->user('both@test.local', 'ngo', 'both', 'both-token');

        $humanResponse = $this->withToken('donor-token')->postJson('/api/donations', [
            'food' => 'Cooked meals',
            'quantity' => 'Approximately 30 servings',
            'beneficiary_type' => 'human',
            'pickup_deadline' => now()->addHours(4)->toIso8601String(),
            'address' => 'Dhanmondi, Dhaka',
        ]);

        $humanResponse->assertCreated()->assertJson(['notifications_created' => 2]);
        $humanDonationId = $humanResponse->json('donation.id');

        $this->assertDatabaseHas('notifications', ['user_id' => $human->id, 'donation_id' => $humanDonationId]);
        $this->assertDatabaseHas('notifications', ['user_id' => $both->id, 'donation_id' => $humanDonationId]);
        $this->assertDatabaseMissing('notifications', ['user_id' => $animal->id, 'donation_id' => $humanDonationId]);

        $animalResponse = $this->withToken('donor-token')->postJson('/api/donations', [
            'food' => 'Animal-safe rice',
            'quantity' => '12 portions',
            'beneficiary_type' => 'animal',
            'pickup_deadline' => now()->addHours(5)->toIso8601String(),
            'address' => 'Banani, Dhaka',
        ]);

        $animalResponse->assertCreated()->assertJson(['notifications_created' => 2]);
        $animalDonationId = $animalResponse->json('donation.id');

        $this->assertDatabaseHas('notifications', ['user_id' => $animal->id, 'donation_id' => $animalDonationId]);
        $this->assertDatabaseHas('notifications', ['user_id' => $both->id, 'donation_id' => $animalDonationId]);
        $this->assertDatabaseMissing('notifications', ['user_id' => $human->id, 'donation_id' => $animalDonationId]);
    }

    public function test_duplicate_notifications_are_prevented_for_same_donation_and_ngo(): void
    {
        $donor = $this->user('donor@test.local', 'donor', null, 'donor-token');
        $ngo = $this->user('both@test.local', 'ngo', 'both', 'both-token');

        $donation = Donation::create([
            'user_id' => $donor->id,
            'food' => 'Cooked meals',
            'quantity' => '10 servings',
            'beneficiary_type' => 'human',
            'pickup_deadline' => now()->addHours(3),
            'address' => 'Dhaka',
            'status' => 'available',
        ]);

        $service = app(DonationNotificationService::class);
        $this->assertSame(1, $service->notifyMatchingNgos($donation));
        $this->assertSame(0, $service->notifyMatchingNgos($donation));

        $this->assertDatabaseCount('notifications', 1);
        $this->assertDatabaseHas('notifications', ['user_id' => $ngo->id, 'donation_id' => $donation->id]);
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
}
