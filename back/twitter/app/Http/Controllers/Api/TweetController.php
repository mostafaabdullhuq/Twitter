<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\CreateTweetRequest;
use App\Models\Like;
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

        $retweets = JWTAuth::user()->retweets()->latest()->get();
        $user = JWTAuth::user();

        return [
            'user' => $user,
            'retweets' => $retweets
        ];
    }

    public function get_User_Replies()
    {
        $user = JWTAuth::user();
        $tweets = [];
        $replies = $user->replies()->latest()->get();
        $user->followers_count = $user->followers()->count();
        $user->followings_count = $user->followings()->count();
        $user->tweets_count = $user->tweets()->count();
        unset($user->id);
        unset($user->google_access_token);
        unset($user->facebook_access_token);
        unset($user->email_verified_at);
        unset($user->updated_at);
        // unset($user->tweets->replies->updated_at);


        foreach ($replies as $key => $reply) {

            $tweet = $this->formatTweet($reply->repliable()->first(), $user->id);
            $tweets[] = $tweet;
            unset($tweet->updated_at);
            // unset($tweet->$reply->repliable_type);
            // unset($reply->repliable_id);
            // unset($reply->user->google_access_token);
            // unset($reply->user->facebook_access_token);
            // unset($reply->user->email_verified_at);

            // unset($tweet->reply->updated_at);

        }

        $response = [
            'user' => $user,
            'tweets' => $tweets
        ];
        return $response;
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
        $response = [];

        $files = $request->allFiles();
        foreach ($files as $key => $value) {
            $response[] = [
                'key' => $key,
                'name' => $value->getClientOriginalName(),
                'type' => $value->getClientMimeType(),
                'size' => $value->getSize(),
                'path' => $value->getRealPath(),
                'extension' => $value->getClientOriginalExtension(),
            ];
        }

        return $response;



        $tweetText = $request->text ?? null;
        $tweetMedia = $request->files ?? null;
        $tweetScheduleDateTime = $request->schedule_date_time ?? null;

        $tweet = JWTAuth::user()->tweets()->create(
            [
                'text' => $tweetText,
                'schedule_date_time' => $tweetScheduleDateTime ?? now(),
                'user_id' => JWTAuth::user()->id
            ]
        );
        if ($tweetMedia) {

            foreach ($tweetMedia as $key => $media) {
                $mediaType = $media?->getClientMimeType();
                $mediaType = explode('/', $mediaType)[0];
                if ($mediaType === 'image') {
                    $mediaType = 1;
                }
                if ($mediaType === 'video') {
                    $mediaType = 2;
                }

                dd($media);

                $media = $media ? $media->store('public/media') : null;
                $mediaName = explode('/', $media)[2];

                // $tweetMedia = $tweetMedia ? $tweetMedia->store('public/media') : null;
                // $mediaName = explode('/', $tweetMedia)[2];
                $tweet->media()->create([
                    'media_url' => $mediaName,
                    'media_type' => $mediaType
                ]);
            }
        }

        $tweet = $this->formatTweet($tweet);
        return $tweet;
    }

    public function details($id)
    {

        try {
            // Find the tweet with the given ID.
            $tweet = Tweet::findOrFail($id);
            // Format the tweet.
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


    public function formatTweet($tweet, $userID = 0)
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
        $replies = $userID ? $tweet->replyWithUserID($userID) : $tweet->replies;
        foreach ($replies as $reply) {
            $reply->user = $reply->user;
            unset($reply->repliable_type);
            unset($reply->repliable_id);
            unset($reply->updated_at);
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

            $reply->replies;
            $reply->media = $replyMedia;
            $reply->replies_count = $reply->replies->count();
            $reply->likes_count = $reply->likes->count();
            $reply->retweets_count = random_int(0, 999999999);
            $reply->views_count = random_int(0, 999999999);
        }

        $tweet->replies = $replies;
        $tweet->user->followers_count = $tweet->user->followers()->count();
        $tweet->user->followings_count = $tweet->user->followings()->count();
        $tweet->user->tweets_count = $tweet->user->tweets()->count();
        $tweet->replies_count = $tweet->replies->count();
        $tweet->likes_count = $tweet->likes->count();
        return $tweet;
    }

    public function formatTweets($tweets)
    {
        foreach ($tweets as $tweet) {
            // Get the user associated with this tweet
            $tweet->user;
            // Remove sensitive information from the user object
            unset($tweet->user->google_access_token);
            unset($tweet->user->facebook_access_token);
            unset($tweet->user->email_verified_at);
            unset($tweet->user->updated_at);
            unset($tweet->user_id);
            // Get the media associated with this tweet
            $tweet->media;
            // Remove sensitive information from the media objects
            foreach ($tweet->media as $media) {
                unset($media['parent_id']);
                unset($media['parent_type']);
                unset($media['updated_at']);
                $media->media_url = $media->media_url ? asset('storage/media/' . $media->media_url) : null;
            }
            // Add some additional information to the user object
            $tweet->user->followers_count = $tweet->user->followers()->count();
            $tweet->user->followings_count = $tweet->user->followings()->count();
            $tweet->user->tweets_count = $tweet->user->tweets()->count();
            $tweet->replies_count = $tweet->replies->count();
        }
        return $tweets;
    }

    public function reply($id, Request $request)
    {
        $request->validate([
            'text' => 'required |string|max:500',
        ]);

        $data = $request->all();
        $tweet = Tweet::find($id);
        $reply = $tweet->replies()->create(
            [
                'text' => $data['text'],
                'user_id' => JWTAuth::user()->id,
            ]
        );

        unset($reply->repliable_type);
        unset($reply->repliable_id);
        unset($reply->updated_at);
        unset($reply->user->google_access_token);
        unset($reply->user->facebook_access_token);
        unset($reply->user->email_verified_at);
        unset($reply->user->updated_at);
        $reply->likes_count = 0;
        $reply->replies_count = 0;
        $reply->retweets_count = 0;
        $reply->views_count = 0;
        $reply->user;
        $reply->media;
        return $reply;
    }

    public function likeToggle($id)
    {
        $user = JWTAuth::user();
        $tweet = Tweet::find($id);
        $like = $tweet->likes()->where('user_id', $user->id)->first();
        if ($like) {
            $like->delete();
        } else {
            $tweet->likes()->create(
                [
                    'user_id' => $user->id,
                ]
            );
        }

        $tweet = $this->formatTweet($tweet);

        return $tweet;
    }
}
