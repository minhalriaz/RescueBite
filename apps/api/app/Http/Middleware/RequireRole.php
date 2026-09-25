<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class RequireRole
{
    public function handle(
        Request $request,
        Closure $next,
        string ...$roles
    ): Response {
        $user = $request->user();

        if (! $user || ! in_array($user->role, $roles, true)) {
            return new JsonResponse([
                'message' => 'You are not authorized to access this resource.',
            ], 403);
        }

        if (in_array($user->role, ['ngo', 'volunteer'], true) && $user->approval_status !== 'approved') {
            return new JsonResponse([
                'message' => 'Your account must be approved before using this resource.',
            ], 403);
        }

        return $next($request);
    }
}