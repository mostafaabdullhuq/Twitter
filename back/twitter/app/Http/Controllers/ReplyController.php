<?php

namespace App\Http\Controllers;

use App\Models\Reply;
use App\Models\Tweet;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use JWTAuth;
use App\Http\Controllers\Api\FormatController;
use App\Http\Controllers\NotificationController;
use App\Notifications\OffersNotification;
use Illuminate\Notifications\Notification;



class ReplyController extends Controller
{
    public $formatter;

    public function __construct()
    {
        $this->middleware('auth:api');
        $this->formatter = new FormatController();
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
        $reply = $this->formatter->formatReply($reply);
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
            $user = $reply->user;
            $tweet = $reply->repliable;
            $user->notify(new OffersNotification($tweet, 'likeReply'));
        }
        $reply = $this->formatter->formatReply($reply);
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
