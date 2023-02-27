<?php

namespace App\Http\Controllers;

use App\Models\Reply;
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

    public function reply($id, Request $request)
    {
        $request->validate([
            'text' => 'required |string|max:500',
        ]);

        $data = $request->all();
        $reply = Reply::find($id);
        $reply = $reply->replies()->create(
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

        $reply->liked = $reply->likedByUserID(JWTAuth::user()->id);
        $reply->likes_count = $reply->likes->count();
        $reply->retweets_count = random_int(0, 999999999);
        $reply->views_count = $reply->views->count();
        $reply->user;
        $reply->media;
        return $reply;
    }

    public function likeToggle($id)
    {
        $user = JWTAuth::user();
        $reply = Reply::find($id);
        $like = $reply->likes()->where('user_id', $user->id)->first();
        if ($like) {
            $like->delete();
        } else {
            $reply->likes()->create(
                [
                    'user_id' => $user->id,
                ]
            );
        }
        $reply->replies_count = $reply->replies->count();
        unset($reply->repliable_type);
        unset($reply->repliable_id);
        unset($reply->updated_at);
        unset($reply->user->google_access_token);
        unset($reply->user->facebook_access_token);
        unset($reply->user->email_verified_at);
        unset($reply->user->updated_at);

        $reply->liked = $reply->likedByUserID(JWTAuth::user()->id);
        $reply->likes_count = $reply->likes->count();
        $reply->retweets_count = random_int(0, 999999999);
        $reply->views_count = $reply->views->count();
        $reply->user;
        $reply->media;
        return $reply;
    }


    public function delete($id)
    {
        try {
            $reply = Reply::find($id);
            if ($reply->user_id != JWTAuth::user()->id) {
                return response()->json(['message' => 'You are not authorized to delete this reply'], 401);
            }
            $reply->delete();
            return response()->json(['message' => 'Reply deleted successfully'], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Reply not found'], 404);
        }
    }
}
