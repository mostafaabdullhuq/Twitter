<?php

namespace App\Http\Controllers;

use App\Models\Tweet;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use JWTAuth;


class ReplyController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');
    }
    public function store($id, Request $request)
    {
        $data = $request->all();
        $tweet = Tweet::find($id);
        $reply = $tweet->replies()->create(
            [
                'text' => $data['text'],
                'user_id' => JWTAuth::user()->id,
            ]
        );

        $reply->replies_count = $reply->replies->count();

        unset($reply->repliable_type);
        unset($reply->repliable_id);
        unset($reply->updated_at);
        unset($reply->user->google_access_token);
        unset($reply->user->facebook_access_token);
        unset($reply->user->email_verified_at);
        unset($reply->user->updated_at);
        $reply->likes_count = random_int(0, 999999999);
        $reply->retweets_count = random_int(0, 999999999);
        $reply->views_count = random_int(0, 999999999);
        $reply->user;
        $reply->media;
        return $reply;
    }
}
