<?php

namespace App\Http\Controllers;

use App\Models\Blocked_user;
use Illuminate\Http\Request;

class BlockController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'blocked_user_id' => 'required',
        ]);

        $user = $request->user();

        $blocking = Blocked_user::where('blocked_user_id', $request->blocked_user_id)
            ->where('blocker_id', $user->id)
            ->first();
        if (!$blocking) {
            $blocking = new Blocked_user();
            $blocking->blocked_user_id = $request->blocked_user_id;
            $blocking->blocker_id = $user->id;

            if ($blocking->save()) {
                return response()->json(
                    ['message' => 'user blocked'],
                    200
                );
            } else {
                return response()->json(
                    ['message' => 'Something went wrong blocking this user, try again'],
                    500
                );
            }
        } else {
            if ($blocking->delete()) {
                return response()->json(
                    ['message' => "you have unblocked this user"],
                    200
                );
            } else {
                return response()->json(
                    ['message' => 'Something went wrong'],
                    500
                );
            }
        }
    }
}
