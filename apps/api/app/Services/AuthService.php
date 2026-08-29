<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;

class AuthService
{
    public function register(array $data): array
    {
        $plainToken = Str::random(64);

        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'phone' => $data['phone'] ?? null,
            'password' => Hash::make($data['password']),
            'role' => $data['role'],
            'beneficiary_preference' => $data['beneficiary_preference'] ?? null,
            'service_area' => $data['service_area'] ?? null,
            'api_token_hash' => hash('sha256', $plainToken),
        ]);

        Log::info('User registered successfully', [
            'user_id' => $user->id,
            'role' => $user->role,
        ]);

        return [
            'token' => $plainToken,
            'user' => $this->userPayload($user),
        ];
    }

    public function login(string $email, string $password): ?array
    {
        $user = User::query()
            ->where('email', $email)
            ->first();

        if (! $user || ! Hash::check($password, $user->password)) {
            Log::warning('Failed login attempt', [
                'email' => $email,
            ]);

            return null;
        }

        $plainToken = Str::random(64);

        $user->forceFill([
            'api_token_hash' => hash('sha256', $plainToken),
        ])->save();

        Log::info('User logged in successfully', [
            'user_id' => $user->id,
            'role' => $user->role,
        ]);

        return [
            'token' => $plainToken,
            'user' => $this->userPayload($user),
        ];
    }

    public function logout(User $user): void
    {
        $user->forceFill([
            'api_token_hash' => null,
        ])->save();

        Log::info('User logged out successfully', [
            'user_id' => $user->id,
            'role' => $user->role,
        ]);
    }

    public function userPayload(User $user): array
    {
        return [
            'id' => $user->id,
            'name' => $user->name,
            'email' => $user->email,
            'phone' => $user->phone,
            'role' => $user->role,
            'beneficiary_preference' => $user->beneficiary_preference,
            'service_area' => $user->service_area,
        ];
    }
}