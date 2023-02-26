<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Like;
use JWTAuth;
use App\Models\Tweet;


class LikeController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');
    }

    public function store (Request $request){
        $request ->validate([
            'tweet_id' => 'required',
        ]);

        $user = $request->user();
        $like= Like::where ('user_id', $user->id)->where('tweet_id', $request->tweet_id)->first();

        if ($like){
            $like->delete();
            return response()->json([
                'message'=> 'unliked',

            ],200);
        }else{
            $like = new Like ();
            $like->user_id = $user->id;
            $like->tweet_id = $request->tweet_id;

            if($like->save()){
                return response()->json([
                    'message'=> 'Liked this post',
                    'like'=> $like
                ],201);
            } else {
                return response()->json([
                    'message'=> 'Error',
                    'like'=> $like
                ],500);
            }

        }

    }
}
