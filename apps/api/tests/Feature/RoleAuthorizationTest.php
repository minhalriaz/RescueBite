<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Hash;
use Tests\TestCase;

class RoleAuthorizationTest extends TestCase
{
    use RefreshDatabase;

    public function test_ngo_cannot_create_donations(): void
    {
        $this->user('ngo@test.local', 'ngo', 'ngo-token', 'both');

        $response = $this->withToken('ngo-token')->postJson('/api/donations', [
            'food' => 'Cooked meals',
            'quantity' => '10 servings',
            'beneficiary_type' => 'human',
            'pickup_deadline' => now()->addHours(4)->toIso8601String(),
            'address' => 'Dhaka',
        ]);

        $response
            ->assertForbidden()
            ->assertJsonPath(
                'message',
                'You are not authorized to access this resource.'
            );
    }

    public function test_donor_cannot_access_ngo_notifications(): void
    {
        $this->user('donor@test.local', 'donor', 'donor-token');

        $this->withToken('donor-token')
            ->getJson('/api/notifications')
            ->assertForbidden()
            ->assertJsonPath(
                'message',
                'You are not authorized to access this resource.'
            );
    }

    public function test_volunteer_cannot_access_donor_or_ngo_routes(): void
    {
        $this->user('volunteer@test.local', 'volunteer', 'volunteer-token');

        $this->withToken('volunteer-token')
            ->postJson('/api/donations', [])
            ->assertForbidden();

        $this->withToken('volunteer-token')
            ->getJson('/api/notifications')
            ->assertForbidden();
    }

    public function test_protected_routes_require_authentication(): void
    {
        $this->getJson('/api/profile')
            ->assertUnauthorized();

        $this->postJson('/api/donations', [])
            ->assertUnauthorized();

        $this->getJson('/api/notifications')
            ->assertUnauthorized();
    }

    private function user(
        string $email,
        string $role,
        string $token,
        ?string $preference = null
    ): User {
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