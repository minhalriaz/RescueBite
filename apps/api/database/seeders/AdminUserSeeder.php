<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdminUserSeeder extends Seeder
{
    public function run(): void
    {
        User::query()->updateOrCreate(
            ['email' => 'admin@rescuebite.test'],
            [
                'name' => 'Admin User',
                'password' => Hash::make(env('RESCUEBITE_ADMIN_PASSWORD', 'Admin123!')),
                'role' => 'admin',
                'approval_status' => 'approved',
                'approved_at' => now(),
                'service_area' => null,
                'api_token_hash' => null,
            ],
        );
    }
}
