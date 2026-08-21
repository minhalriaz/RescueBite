<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\DonationController;
use App\Http\Controllers\NotificationController;
use Illuminate\Support\Facades\Route;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('api.token')->group(function (): void {
    Route::get('/profile', [AuthController::class, 'profile']);
    Route::post('/logout', [AuthController::class, 'logout']);

    Route::middleware('role:donor')->group(function (): void {
        Route::post('/donations', [DonationController::class, 'store']);
        Route::post('/food-donations', [DonationController::class, 'store']);
    });

    Route::middleware('role:ngo')->group(function (): void {
        Route::get('/notifications', [NotificationController::class, 'index']);
        Route::patch('/notifications/read-all', [NotificationController::class, 'readAll']);

        Route::patch('/notifications/{notificationId}/read', [NotificationController::class, 'markRead'])
            ->whereNumber('notificationId');

        // Backward-compatible alias from the original API contract.
        Route::put('/notifications/{notificationId}/read', [NotificationController::class, 'markRead'])
            ->whereNumber('notificationId');
    });
});
