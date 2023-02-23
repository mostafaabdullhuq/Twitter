<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\CreateTweetRequest;
use App\Models\Reply;
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
        $tweetMedia = $request->media ?? null;
        $tweetScheduleDateTime = $request->schedule_date_time ?? null;
        $mediaType = $tweetMedia->getClientMimeType();
        $mediaType = explode('/', $mediaType)[0];
        if ($mediaType === 'image') {
            $mediaType = 1;
        }
        if ($mediaType === 'video') {
            $mediaType = 2;
        }

        $tweetMedia = $tweetMedia ? $tweetMedia->store('public/media') : null;
        $mediaName = explode('/', $tweetMedia)[2];
        // $tweetMedia = $tweetMedia ? asset('storage/media/') : null;
        // dd($tweetMedia);

        $tweet = JWTAuth::user()->tweets()->create(
            [
                'text' => $tweetText,
                'schedule_date_time' => $tweetScheduleDateTime ?? now(),
                'user_id' => JWTAuth::user()->id
            ]
        );
        if ($tweetMedia) {
            $tweet->media()->create([
                'media_url' => $mediaName,
                'media_type' => $mediaType
            ]);
        }
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


    public function formatTweet($tweet)
    {
        // add user object to the tweet object and delete security sensitive information
        $tweet->user;
        unset($tweet->user->google_access_token);
        unset($tweet->user->facebook_access_token);
        unset($tweet->user->email_verified_at);
        unset($tweet->user->updated_at);
        unset($tweet->user_id);




        // get the media of the tweet and update it's url values and remove security sensitive info
        $media = $tweet->media;
        if ($media->count()) {
            foreach ($media as $key => $value) {
                unset($value['parent_id']);
                unset($value['parent_type']);
                unset($value['updated_at']);
                $value->media_url = asset('storage/media/' . $value->media_url);
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
            $value->user->followers_count = $value->user->followers()->count();
            $value->user->followings_count = $value->user->followings()->count();
            $value->user->tweets_count = $value->user->tweets()->count();
            foreach ($value->media as $media_key => $media_value) {
                $media_value->media_url = $media_value->media_url ? asset('storage/media/' . $media_value->media_url) : null;
                unset($media_value['parent_id']);
                unset($media_value['parent_type']);
                unset($media_value['updated_at']);
            }
        }

        return $tweets;
    }
}
