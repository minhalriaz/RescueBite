<?php

namespace Database\Seeders;

use App\Models\Donation;
use App\Models\PickupTask;
use App\Models\RescueRequest;
use App\Models\User;
use App\Services\DonationNotificationService;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DevelopmentDataSeeder extends Seeder
{
    public function run(): void
    {
        $admin = User::where('email', 'admin@rescuebite.test')->firstOrFail();

        $donor = $this->user('Jannat', 'jannat@gmail.com', 'Jannat123!', 'donor', 'approved');
        $ngo = $this->user('Hope Foundation', 'hope@rescuebite.test', 'Ngo123!', 'ngo', 'approved', 'human');
        $pendingNgo = $this->user('Community Food NGO', 'community@rescuebite.test', 'Ngo123!', 'ngo', 'pending', 'both');
        $volunteer = $this->user('Ayesha Rahman', 'ayesha@rescuebite.test', 'Volunteer123!', 'volunteer', 'approved');
        $pendingVolunteer = $this->user('Rafi Ahmed', 'rafi@rescuebite.test', 'Volunteer123!', 'volunteer', 'pending');

        $biryani = Donation::firstOrCreate(
            ['user_id' => $donor->id, 'food' => 'Biryani'],
            [
                'quantity' => '10 packets',
                'beneficiary_type' => 'human',
                'pickup_deadline' => now()->addDays(2),
                'address' => 'Rampura, Dhaka',
                'description' => 'Fresh biryani available for a nearby approved NGO.',
                'status' => 'available',
                'is_demo' => false,
            ],
        );

        $completedDonation = Donation::firstOrCreate(
            ['user_id' => $donor->id, 'food' => 'Vegetable Khichuri'],
            [
                'quantity' => '20 packets',
                'beneficiary_type' => 'human',
                'pickup_deadline' => now()->subDay(),
                'address' => 'Dhanmondi, Dhaka',
                'description' => 'Completed development rescue record.',
                'status' => 'completed',
                'is_demo' => false,
            ],
        );

        $completedRequest = RescueRequest::firstOrCreate(
            ['donation_id' => $completedDonation->id, 'ngo_id' => $ngo->id],
            [
                'status' => 'completed',
                'reviewed_by' => $admin->id,
                'requested_at' => now()->subDays(2),
                'reviewed_at' => now()->subDays(2),
                'review_note' => 'Development rescue restored from the real workflow.',
            ],
        );

        PickupTask::firstOrCreate(
            ['rescue_request_id' => $completedRequest->id],
            [
                'volunteer_id' => $volunteer->id,
                'status' => 'completed',
                'assigned_at' => now()->subDays(2),
                'picked_up_at' => now()->subDays(2)->addHours(1),
                'delivered_at' => now()->subDays(2)->addHours(3),
                'completed_at' => now()->subDays(2)->addHours(3),
                'completion_note' => 'Delivered to the NGO.',
            ],
        );

        app(DonationNotificationService::class)->notifyMatchingNgos($biryani);
    }

    private function user(
        string $name,
        string $email,
        string $password,
        string $role,
        string $approvalStatus,
        ?string $beneficiaryPreference = null,
    ): User {
        return User::updateOrCreate(
            ['email' => $email],
            [
                'name' => $name,
                'password' => Hash::make($password),
                'role' => $role,
                'approval_status' => $approvalStatus,
                'approved_at' => $approvalStatus === 'approved' ? now() : null,
                'beneficiary_preference' => $beneficiaryPreference,
                'service_area' => 'Dhaka',
                'api_token_hash' => null,
            ],
        );
    }
}
