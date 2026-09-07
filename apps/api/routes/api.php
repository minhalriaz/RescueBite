<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\DonationController;
use App\Http\Controllers\DonorController;
use App\Http\Controllers\NgoController;
use App\Http\Controllers\NotificationController;
use Illuminate\Support\Facades\Route;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::get('/donations', [DonationController::class, 'index']);

Route::middleware('api.token')->group(function (): void {
    Route::get('/profile', [AuthController::class, 'profile']);
    Route::post('/logout', [AuthController::class, 'logout']);

    Route::middleware('role:donor')->group(function (): void {
        Route::get('/my-donations', [DonorController::class, 'myDonations']);
        Route::post('/donations', [DonationController::class, 'store']);
        Route::post('/food-donations', [DonationController::class, 'store']);
    });

    Route::middleware('role:ngo')->group(function (): void {
        Route::get('/requests', [NgoController::class, 'requests']);
        Route::get('/notifications', [NotificationController::class, 'index']);
        Route::patch('/notifications/read-all', [NotificationController::class, 'readAll']);

        Route::patch('/notifications/{notificationId}/read', [NotificationController::class, 'markRead'])
            ->whereNumber('notificationId');

        // Backward-compatible alias from the original API contract.
        Route::put('/notifications/{notificationId}/read', [NotificationController::class, 'markRead'])
            ->whereNumber('notificationId');
    });
});
