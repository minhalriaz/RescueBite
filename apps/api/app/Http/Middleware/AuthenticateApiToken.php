<?php

namespace App\Http\Middleware;

use App\Models\User;
use Closure;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class AuthenticateApiToken
{
    public function handle(Request $request, Closure $next): Response
    {
        $token = $request->bearerToken() ?: $request->header('X-API-Token');

        if (! $token) {
            return new JsonResponse(['message' => 'Unauthenticated.'], 401);
        }

        $user = User::query()
            ->where('api_token_hash', hash('sha256', $token))
            ->first();

        if (! $user) {
            return new JsonResponse(['message' => 'Invalid or expired API token.'], 401);
        }

        $request->setUserResolver(fn () => $user);

        return $next($request);
    }
}
