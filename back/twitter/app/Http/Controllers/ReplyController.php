<?php

namespace App\Http\Controllers;
use App\Models\Tweet;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use JWTAuth;


class ReplyController extends Controller
{
    public function store($id, Request $request)
    {
        $reply = $request->all();

            $tweet = Tweet::find($id);
            $tweet->replies()->create(
                [
                    'text' => $reply['text'],
                    'user_id' => JWTAuth::user()->id,

                ]
            );
        }
}
