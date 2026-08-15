<?php

namespace App\Http\Controllers;

use App\Models\RescueNotification;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class NotificationController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $user = $request->user();

        if ($user->role !== 'ngo') {
            return response()->json([
                'data' => [],
                'unread_count' => 0,
                'message' => 'Donation alerts are available to NGO accounts.',
            ]);
        }

        $notifications = RescueNotification::query()
            ->where('user_id', $user->id)
            ->latest()
            ->limit(50)
            ->get();

        return response()->json([
            'data' => $notifications,
            'unread_count' => $notifications->whereNull('read_at')->count(),
        ]);
    }

    public function markRead(Request $request, int $notificationId): JsonResponse
    {
        $notification = RescueNotification::query()
            ->where('user_id', $request->user()->id)
            ->findOrFail($notificationId);

        if (is_null($notification->read_at)) {
            $notification->forceFill(['read_at' => now()])->save();
        }

        return response()->json([
            'message' => 'Notification marked as read.',
            'notification' => $notification->fresh(),
        ]);
    }

    public function readAll(Request $request): JsonResponse
    {
        $updated = RescueNotification::query()
            ->where('user_id', $request->user()->id)
            ->whereNull('read_at')
            ->update(['read_at' => now(), 'updated_at' => now()]);

        return response()->json([
            'message' => 'All notifications marked as read.',
            'updated' => $updated,
            'unread_count' => 0,
        ]);
    }
}
