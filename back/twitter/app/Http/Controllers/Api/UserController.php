<?php

namespace App\Http\Controllers\Api;


use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;

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

    public function get_all_users(){
        return User::all();
    }


    public function destroy(Request $request)
    {
        $request->user()->delete();

        return response()->json(['message' => 'user permanently deleted '], 500);
    }
}
