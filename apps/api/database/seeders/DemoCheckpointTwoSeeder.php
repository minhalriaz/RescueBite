<?php

namespace Database\Seeders;

use App\Models\Donation;
use App\Models\User;
use App\Services\DonationNotificationService;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DemoCheckpointTwoSeeder extends Seeder
{
    public function run(): void
    {
        $donor = $this->upsertUser(
            'Demo Donor',
            'donor@rescuebite.test',
            'donor',
            null,
            'demo-donor-token',
        );

        $this->upsertUser('Human Hope NGO', 'human.ngo@rescuebite.test', 'ngo', 'human', 'demo-human-ngo-token');
        $this->upsertUser('Animal Care NGO', 'animal.ngo@rescuebite.test', 'ngo', 'animal', 'demo-animal-ngo-token');
        $this->upsertUser('Rescue All Foundation', 'both.ngo@rescuebite.test', 'ngo', 'both', 'demo-both-ngo-token');

        Donation::query()->where('user_id', $donor->id)->where('is_demo', true)->delete();

        $humanDonation = Donation::create([
            'user_id' => $donor->id,
            'food' => 'Cooked meals',
            'quantity' => 'Approximately 30 servings',
            'beneficiary_type' => 'human',
            'pickup_deadline' => now()->addHours(6),
            'address' => 'Dhanmondi, Dhaka',
            'description' => 'Freshly cooked meals prepared for a community event.',
            'status' => 'available',
            'is_demo' => true,
        ]);

        $animalDonation = Donation::create([
            'user_id' => $donor->id,
            'food' => 'Unsalted rice and chicken',
            'quantity' => '20 animal portions',
            'beneficiary_type' => 'animal',
            'pickup_deadline' => now()->addHours(8),
            'address' => 'Banani, Dhaka',
            'description' => 'Suitable for registered animal shelters after normal safety checks.',
            'status' => 'available',
            'is_demo' => true,
        ]);

        $service = app(DonationNotificationService::class);
        $service->notifyMatchingNgos($humanDonation);
        $service->notifyMatchingNgos($animalDonation);
    }

    private function upsertUser(
        string $name,
        string $email,
        string $role,
        ?string $preference,
        string $token,
    ): User {
        return User::query()->updateOrCreate(
            ['email' => $email],
            [
                'name' => $name,
                'phone' => '+8801700000000',
                'password' => Hash::make('password'),
                'role' => $role,
                'beneficiary_preference' => $preference,
                'service_area' => 'Dhaka',
                'api_token_hash' => hash('sha256', $token),
            ],
        );
    }
}
