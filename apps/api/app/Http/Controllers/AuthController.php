<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;

class AuthController extends Controller
{
    public function register(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:120'],
            'email' => ['required', 'email', 'max:190', 'unique:users,email'],
            'phone' => ['nullable', 'string', 'max:30'],
            'password' => ['required', 'string', 'min:6'],
            'role' => ['required', Rule::in(['donor', 'ngo', 'volunteer'])],
            'beneficiary_preference' => [
                Rule::requiredIf(fn () => $request->input('role') === 'ngo'),
                'nullable',
                Rule::in(['human', 'animal', 'both']),
            ],
            'service_area' => ['nullable', 'string', 'max:190'],
        ]);

        $plainToken = Str::random(64);

        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'phone' => $validated['phone'] ?? null,
            'password' => Hash::make($validated['password']),
            'role' => $validated['role'],
            'beneficiary_preference' => $validated['beneficiary_preference'] ?? null,
            'service_area' => $validated['service_area'] ?? null,
            'api_token_hash' => hash('sha256', $plainToken),
        ]);

        return response()->json([
            'message' => 'User registered successfully.',
            'token' => $plainToken,
            'user' => $this->userPayload($user),
        ], 201);
    }

    public function login(Request $request): JsonResponse
    {
        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required', 'string'],
        ]);

        $user = User::query()->where('email', $credentials['email'])->first();

        if (! $user || ! Hash::check($credentials['password'], $user->password)) {
            return response()->json(['message' => 'Invalid email or password.'], 422);
        }

        $plainToken = Str::random(64);
        $user->forceFill(['api_token_hash' => hash('sha256', $plainToken)])->save();

        return response()->json([
            'message' => 'Login successful.',
            'token' => $plainToken,
            'user' => $this->userPayload($user),
        ]);
    }

    public function profile(Request $request): JsonResponse
    {
        return response()->json(['user' => $this->userPayload($request->user())]);
    }

    public function logout(Request $request): JsonResponse
    {
        $request->user()->forceFill(['api_token_hash' => null])->save();

        return response()->json(['message' => 'Logged out successfully.']);
    }

    private function userPayload(User $user): array
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
