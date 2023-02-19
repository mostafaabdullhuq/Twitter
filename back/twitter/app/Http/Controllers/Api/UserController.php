<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');
    }

    public function index()
    {
        return auth()->user();
    }

    public function update(Request $request)
    {
        $user = auth()->user();
        $user->update($request->all());
        return $user;
    }

    public function destroy()
    {
        $user = auth()->user();
        $user->delete();
        return response()->json(null, 204);
    }
}
