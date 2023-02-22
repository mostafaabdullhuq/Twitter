<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\CreateTweetRequest;
use Apuse App\Models\Reply;
use App\Models\Tweet;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use JWTAuth;

class TweetController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');
    }

    // get logged in user tweets
    public function me()
    {

        $tweets = JWTAuth::user()->tweets()->latest()->get();
        $user = JWTAuth::user();
        $user->followers_count = $user->followers()->count();
        $user->followings_count = $user->followings()->count();
        $user->tweets_count = $user->tweets()->count();

        $tweets = $this->formatTweets($tweets);


        return [
            'user' => $user,
            'tweets' => $tweets
        ];
    }

    public function get_User_Retweets()
    {

        $retweets = JWTAuth::user()->retweets()->latest()->get();
        $user = JWTAuth::user();
        $user->followers_count = $user->followers()->count();
        $user->followings_count = $user->followings()->count();
        $user->tweets_count = $user->retweets()->count();

        $retweets = $this->formatTweets($retweets);


        return [
            'user' => $user,
            'retweets' => $retweets
        ];
    }




    // get logged in user for you tweets (tweets of followings of the followings of the user)
    public function homeforyou()
    {
        $tweets = $this->formatTweets(JWTAuth::user()->hforyou()->get());
        return $tweets;
    }

    // get logged in user for you tweets (followings tweets and user tweets ordered from newest to oldest)
    public function homefollowing()
    {
        $tweets = JWTAuth::user()->hfollowing()->get();
        $tweets = $this->formatTweets($tweets);
        return $tweets;
    }

    // ----------------- in progress ----------------------
    public function create(CreateTweetRequest $request)
    {
        $tweetText = $request->text;
        $tweet = JWTAuth::user()->tweets()->create(
            [
                'text' => $tweetText,
                'schedule_date_time' => $request->schedule_date_time ?? now(),
            ]
        );
        return $tweet;
    }

    public function details($id)
    {
        $tweet = Tweet::findOrFail($id);
        $replies = $tweet->replies;
        $tweet = $this->formatTweet($tweet);

        foreach ($replies as $reply) {
            $reply->user = $reply->user;
        }

        return $tweet;
    }

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


    public function formatTweet($tweet)
    {
        $tweet->user;
        unset($tweet->user->google_access_token);
        unset($tweet->user->facebook_access_token);
        unset($tweet->user->email_verified_at);
        unset($tweet->user->updated_at);
        unset($tweet->user_id);
        $tweet->media;
        unset($tweet->media[0]['parent_id']);
        unset($tweet->media[0]['parent_type']);
        $tweet->user->followers_count = $tweet->user->followers()->count();
        $tweet->user->followings_count = $tweet->user->followings()->count();
        $tweet->user->tweets_count = $tweet->user->tweets()->count();
        return $tweet;
    }


    public function formatTweets($tweets)
    {
        foreach ($tweets as $value) {
            $value->user;
            unset($value->user->google_access_token);
            unset($value->user->facebook_access_token);
            unset($value->user->email_verified_at);
            unset($value->user->updated_at);
            unset($value->user_id);
            $value->media;
            unset($value->media->parent_type);
            unset($value->media->parent_id);
