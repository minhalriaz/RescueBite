<?php

namespace App\Http\Controllers;

use App\Models\RescueNotification;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class NgoController extends Controller
{
    public function requests(Request $request): JsonResponse
    {
        $user = $request->user();

        if ($user->role !== 'ngo') {
            return response()->json(['message' => 'NGO access only.'], 403);
        }

        $notifications = RescueNotification::query()
            ->where('user_id', $user->id)
            ->with('donation:id,food,quantity,beneficiary_type,address,pickup_deadline,status')
            ->orderByDesc('created_at')
            ->limit(50)
            ->get()
            ->map(fn (RescueNotification $n) => [
                'id' => $n->id,
                'title' => $n->title,
                'message' => $n->message,
                'type' => $n->type,
                'read_at' => $n->read_at?->toIso8601String(),
                'created_at' => $n->created_at?->toIso8601String(),
                'donation' => $n->donation ? [
                    'id' => $n->donation->id,
                    'food' => $n->donation->food,
                    'quantity' => $n->donation->quantity,
                    'beneficiary_type' => $n->donation->beneficiary_type,
                    'address' => $n->donation->address,
                    'pickup_deadline' => $n->donation->pickup_deadline?->toIso8601String(),
                    'status' => $n->donation->status,
                ] : null,
            ]);

        return response()->json(['data' => $notifications]);
    }
}
