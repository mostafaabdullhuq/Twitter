<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\CreateTweetRequest;
use App\Models\Tweet;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class TweetController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');
    }

    // get logged in user tweets
    public function me()
    {
        // return auth()->user()->tweets()->latest()->cursorPaginate(20);
        return auth()->user()->tweets()->latest();
    }


    // get logged in user home tweets (followings tweets and user tweets ordered from newest to oldest)
    public function home()
    {
        return auth()->user()->home()->cursorPaginate(20);
    }

    // ----------------- in progress ----------------------
    public function create(CreateTweetRequest $request)
    {
        $tweetText = $request->text;
        $tweet = auth()->user()->tweets()->create(
            [
                'text' => $tweetText,
                'schedule_date_time' => $request->schedule_date_time ?? now(),
            ]
        );
        return $tweet;
    }

    // public function details($id)
    // {
    //     return auth()->user()->tweets()->findOrFail($id);
    // }

    // public function edit(Request $request, $id)
    // {
    //     $tweet = auth()->user()->tweets->findOrFail($id);
    //     $tweet->update($request->all());
    //     return $tweet;
    // }

    // public function delete($id)
    // {
    //     $tweet = auth()->user()->tweets->findOrFail($id);
    //     $tweet->delete();
    //     return response()->json(null, 204);
    // }

    // public function like($id)
    // {
    //     $tweet = auth()->user()->tweets->findOrFail($id);
    //     $tweet->likes()->create(['user_id' => auth()->id()]);
    //     return $tweet;
    // }

    // public function unlike($id)
    // {
    //     $tweet = auth()->user()->tweets->findOrFail($id);
    //     $tweet->likes()->where('user_id', auth()->id())->delete();
    //     return $tweet;
    // }

    // public function retweet($id)
    // {
    //     $tweet = auth()->user()->tweets->findOrFail($id);
    //     $tweet->retweets()->create(['user_id' => auth()->id()]);
    //     return $tweet;
    // }

    // public function unretweet($id)
    // {
    //     $tweet = auth()->user()->tweets->findOrFail($id);
    //     $tweet->retweets()->where('user_id', auth()->id())->delete();
    //     return $tweet;
    // }

    // public function reply(Request $request, $id)
    // {
    //     $tweet = auth()->user()->tweets->findOrFail($id);
    //     $tweet->replies()->create($request->all());
    //     return $tweet;
    // }

    // public function unreply($id)
    // {
    //     $tweet = auth()->user()->tweets->findOrFail($id);
    //     $tweet->replies()->where('user_id', auth()->id())->delete();
    //     return $tweet;
    // }

    // public function bookmark($id)
    // {
    //     $tweet = auth()->user()->tweets->findOrFail($id);
    //     $tweet->bookmarks()->create(['user_id' => auth()->id()]);
    //     return $tweet;
    // }

    // public function unbookmark($id)
    // {
    //     $tweet = auth()->user()->tweets->findOrFail($id);
    //     $tweet->bookmarks()->where('user_id', auth()->id())->delete();
    //     return $tweet;
    // }

    // public function share($id)
    // {
    //     $tweet = auth()->user()->tweets->findOrFail($id);
    //     $tweet->shares()->create(['user_id' => auth()->id()]);
    //     return $tweet;
    // }

    // public function unshare($id)
    // {
    //     $tweet = auth()->user()->tweets->findOrFail($id);
    //     $tweet->shares()->where('user_id', auth()->id())->delete();
    //     return $tweet;
    // }
}
