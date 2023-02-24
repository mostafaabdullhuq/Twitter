<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\CreateTweetRequest;
// use Apuse App\Models\Reply;
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

        $retweets = JWTAuth::user()->retweets()->get();
        $user = JWTAuth::user();

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
        try {
            $tweet = Tweet::findOrFail($id);
            $tweet = $this->formatTweet($tweet);
            return $tweet;
        } catch (
            \Illuminate\Database\Eloquent\ModelNotFoundException $e
        ) {
            return response()->json(['error' => 'Tweet not found.', 'code' => 1], 404);
        } catch (
            \Exception $e
        ) {
            return response()->json(['error' => $e->getMessage(), 'code' => 2], 500);
        }
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
        $media = $tweet->media;
        if ($media->count()) {
            foreach ($media as $key => $value) {
                unset($value['parent_id']);
                unset($value['parent_type']);
            }
        }
        $replies = $tweet->replies;
        foreach ($replies as $reply) {
            $reply->user = $reply->user;
            unset($reply->repliable_type);
            unset($reply->repliable_id);
            unset($reply->user->google_access_token);
            unset($reply->user->facebook_access_token);
            unset($reply->user->email_verified_at);
            unset($reply->user->updated_at);
            $replyMedia = $reply->media;
            foreach ($replyMedia as $key => $value) {
                unset($value->parent_type);
                unset($value->parent_id);
                unset($value->updated_at);
            }
            $reply->media = $replyMedia;
            $reply->replies_count = random_int(0, 999999999);
            $reply->likes_count = random_int(0, 999999999);
            $reply->retweets_count = random_int(0, 999999999);
            $reply->views_count = random_int(0, 999999999);
            // $reply->replies_count =$reply->replies()->count();
            // $reply->likes_count = $reply->likes()->count();
            // $reply->retweets_count = $reply->retweets()->count();
            // $reply->views_count = $reply->views()->count();
        }
        $tweet->replies = $replies;
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
        }
        return $tweets;
    }
}
