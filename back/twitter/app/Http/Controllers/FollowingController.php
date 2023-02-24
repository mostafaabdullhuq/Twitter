<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Follow;
use Response;

class FollowingController extends Controller
{
    public function store(Request $request){
        
        $request->validate([
            'following_id' => 'required',
        ]);

        $user = $request->user();

        $following = Follow::where('following_id', $request->following_id)
                            ->where('follower_id',$user->id)
                            ->first();
        if(!$following){
            $following = new Follow();
            $following->following_id = $request->following_id;
            $following->follower_id = $user->id;
            
            if($following->save()){
                return response()->json(
                            ['message' => 'now you are following this user']
                            ,200);
            } else{
                return response()->json(
                    ['message' => 'Something went wrong following this user, try again']
                            ,500);
            }

        } else{
            if($following->delete()){
                return response()->json(
                    ['message' => "you have unfollowed this user"]
                    ,200);
            }  else{
                return response()->json(
                    ['message' => 'Something went wrong']
                            ,500);
            }
        }

    }
}
