<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Services\AuthService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class AuthController extends Controller
{
    public function register(
        Request $request,
        AuthService $authService
    ): JsonResponse {
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

        $result = $authService->register($validated);

        return response()->json([
            'message' => 'User registered successfully.',
            'token' => $result['token'],
            'user' => $result['user'],
        ], 201);
    }

    public function login(
        Request $request,
        AuthService $authService
    ): JsonResponse {
        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required', 'string'],
        ]);

        $result = $authService->login(
            $credentials['email'],
            $credentials['password']
        );

        if ($result === null) {
            return response()->json([
                'message' => 'Invalid email or password.',
            ], 422);
        }

        return response()->json([
            'message' => 'Login successful.',
            'token' => $result['token'],
            'user' => $result['user'],
        ]);
    }

    public function profile(
        Request $request,
        AuthService $authService
    ): JsonResponse {
        return response()->json([
            'user' => $authService->userPayload($request->user()),
        ]);
    }

    public function logout(
        Request $request,
        AuthService $authService
    ): JsonResponse {
        $authService->logout($request->user());

        return response()->json([
            'message' => 'Logged out successfully.',
        ]);
    }
}