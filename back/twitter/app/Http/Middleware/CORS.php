<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

use Illuminate\Http\Response;

class CORS
{
    public function handle(Request $request, Closure $next)
    {
        $response = $next($request);

        $response->header('Access-Control-Allow-Origin', '*');
        $response->header('Access-Control-Allow-Headers', 'Content-type, X-Auth-Token, Authorization, Origin');

        return $response;
    }
}

