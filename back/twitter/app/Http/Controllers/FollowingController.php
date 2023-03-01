<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Follow;
use App\Models\User;
use JWTAuth;
use Response;

class FollowingController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');
    }


    public function store(Request $request)
    {

        $request->validate([
            'following_id' => 'required',
        ]);

        $user = $request->user();

        // $user->followed = $user->isFollowedBy(JWTAuth::user()->id);

        $following = Follow::where('following_id', $request->following_id)
            ->where('follower_id', $user->id)
            ->first();
        if (!$following) {
            $following = new Follow();
            $following->following_id = $request->following_id;
            $following->follower_id = $user->id;

            if ($following->save()) {
                return response()->json(
                    ['message' => 'now you are following this user'],
                    200
                );
            } else {
                return response()->json(
                    ['message' => 'Something went wrong following this user, try again'],
                    500
                );
            }
        } else {
            if ($following->delete()) {
                return response()->json(
                    ['message' => "you have unfollowed this user"],
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

    public function get_followers(Request $request)
    {

        // $request->validate([
        //     'following_id' => 'required',
        // ]);

        $user = $request->user();

        $following = Follow::select('follower_id')->where('following_id', $user->id)->get();
        // $user = User::find(follower_id);
        $user =  JWTAuth::user();

        if ($following) {
            return response()->json(
                ['following' => $following, 'user' => $user],
                200
            );
        } else {
            return response()->json(
                ["message' => 'user doesn't have any followers"],
                500
            );
        }

        // dd($following);
    }

    public function get_followings(Request $request)
    {

        // $request->validate([
        //     'following_id' => 'required',
        // ]);

        $user = $request->user();

        $following = Follow::select('following_id')->where('follower_id', $user->id)->get();

        if ($following) {
            return response()->json(
                $following,
                200
            );
        } else {
            return response()->json(
                ["message' => 'user doesn't have any followings"],
                500
            );
        }

        // dd($following);
    }
}
