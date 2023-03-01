<?php

namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller;
use App\Http\Requests\Api\CreateTweetRequest;
use App\Models\Like;
use App\Models\Media;
use App\Models\Reply;
use App\Models\Retweet;
use App\Models\Tweet;
use App\Models\User;
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
    public function me($username)
    {
        $user = User::where('username', $username)->first();
        if ($user) {
            $tweets = $user->tweets()->latest()->get();
            $user->followers_count = $user->followers()->count();
            $user->followings_count = $user->followings()->count();
            $user->tweets_count = $user->tweets()->count();
            $tweets = $this->formatTweets($tweets);
            $user->is_following = JWTAuth::user()->isFollowing($user);
            return [
                'user' => $user,
                'tweets' => $tweets
            ];
        }
        return response()->json(['error' => 'User not found'], 404);
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

    public function get_User_Replies($username)
    {
        $user = User::where('username', $username)->first();
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
        // $user = $this->formatUser($user);
        foreach ($replies as $key => $reply) {
            $replyParent = $reply->repliable()->first();
            if ($replyParent) {
                $tweet = $this->formatTweet($replyParent, $user->id);
                $tweets[] = $tweet;

                unset($tweet->updated_at);
            }
        }

        // remove dupplicated tweets and return as indexed array
        $tweets = array_values(array_unique($tweets, SORT_REGULAR));
        $response = [
            'user' => $user,
            'tweets' => $tweets
        ];
        return $response;
    }

    public function get_User_Likes($username)
    {
        $user = User::where('username', $username)->first();
        $likes = $user->likes()->latest()->get();
        $tweets = [];
        $user->followers_count = $user->followers()->count();
        $user->followings_count = $user->followings()->count();
        $user->tweets_count = $user->likes()->count(); //get tweets count that was liked
        unset($user->tweetsWithMedia);
        unset($user->google_access_token);
        unset($user->facebook_access_token);
        unset($user->updated_at);
        unset($user->email_verified_at);
        foreach ($likes as $key => $like) {
            if ($like->liked_type == Tweet::class) {
                $tweet = Tweet::find($like->liked_id);
                if ($tweet) {
                    $tweets[] = $tweet;
                }
            }
        }
        $tweets = $this->formatTweets($tweets);
        return [
            'user' => $user,
            'tweets' => $tweets
        ];
    }

    public function get_User_Media($username)
    {
        $user = User::where('username', $username)->first();
        $tweets = $user->tweetsWithMedia;
        $user->followers_count = $user->followers()->count();
        $user->followings_count = $user->followings()->count();
        $user->tweets_count = $user->tweetsWithMedia()->count();
        unset($user->tweetsWithMedia);
        unset($user->google_access_token);
        unset($user->facebook_access_token);
        unset($user->updated_at);
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

        $tweetText = $request->text ?? null;
        $tweetMedia = $request->allFiles()["files"] ?? null;
        $tweetScheduleDateTime = $request->schedule_date_time ?? null;
        $tweet = JWTAuth::user()->tweets()->create(
            [
                'text' => $tweetText,
                'schedule_date_time' => $tweetScheduleDateTime ?? now(),
                'user_id' => JWTAuth::user()->id
            ]
        );
        $tweetHashtags = [];
        if ($tweetText) {
            $reqHashtags = preg_grep(
                '/#([\p{Pc}\p{N}\p{L}\p{Mn}]+)/',
                explode(' ', $tweetText)
            );
            foreach ($reqHashtags as $key => $hashtag) {
                $hashtag = str_replace('#', '', $hashtag);
                $tweetHashtags[] = $hashtag;
            }
        }
        $tweetHashtags ? $tweet->attachTags($tweetHashtags) : null;
        $tweetMentions = [];
        if ($tweetText) {
            $reqMentions = preg_grep(
                '/@([\p{Pc}\p{N}\p{L}\p{Mn}]+)/',
                explode(' ', $tweetText)
            );
            foreach ($reqMentions as $key => $mention) {
                $mention = str_replace('@', '', $mention);
                $tweetMentions[] = $mention;
            }
        }
        // find users with mentions
        $users = User::whereIn('username', $tweetMentions)->get();
        foreach ($users as $key => $user) {
            // notify the mentioned user
            // $user->notify(new Mentioned($tweet));
            // add mentions to tweet
            $tweet->mentions()->create([
                'mentioned_user_id' => $user->id
            ]);
        }
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
                $media = $media ? $media->store('public/media') : null;
                $mediaName = explode('/', $media)[2];
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
        $tweet->liked = $tweet->likedByUserID(JWTAuth::user()->id);
        $tweet->bookmarked = JWTAuth::user()->isBookmarked($tweet->id);
        // $tweet->retweeted = JWTAuth::user()->isRetweeted($tweet->id);
        $tweet->replies_count = $tweet->replies->count();
        $tweet->likes_count = $tweet->likes->count();
        $tweet->retweets_count = $tweet->retweets->count();
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
            $reply->liked = $reply->likedByUserID(JWTAuth::user()->id);
            $reply->media = $replyMedia;
            $reply->replies_count = $reply->replies->count();
            $reply->likes_count = $reply->likes->count();
            $reply->views_count = $reply->views->count();
            // $reply->retweets_count = $reply->retweets()->count();
        }
        $tweet->replies = $replies;
        $tweet->user->followers_count = $tweet->user->followers()->count();
        $tweet->user->followings_count = $tweet->user->followings()->count();
        $tweet->user->tweets_count = $tweet->user->tweets()->count();

        $tags = $tweet->tags;
        foreach ($tags as $key => $tag) {
            unset($tag->pivot);
            unset($tag->created_at);
            unset($tag->updated_at);
            unset($tag->order_column);
        }
        $tweet->tags = $tags;

        $mentions = $tweet->mentions;

        foreach ($mentions as $key => $mention) {
            $mention->mentioned_user = $mention->mentionedUser;
            unset($mention->mentioned_user->google_access_token);
            unset($mention->mentioned_user->facebook_access_token);
            unset($mention->mentioned_user->email_verified_at);
            unset($mention->mentioned_user->updated_at);
            unset($mention->mentioned_user_id);
            unset($mention->mentionable_type);
            unset($mention->mentionable_id);
            unset($mention->updated_at);
        }
        $tweet->mentions = $mentions;

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
            $tweet->liked = $tweet->likedByUserID(JWTAuth::user()->id);
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
            $tweet->likes_count = $tweet->likes->count();
            $tweet->retweets_count = $tweet->retweets->count();
        }
        return $tweets;
    }

    // public function formatUser($user )
    // {
    //     unset($user->id);
    //     unset($user->google_access_token);
    //     unset($user->facebook_access_token);
    //     unset($user->email_verified_at);
    //     unset($user->updated_at);
    // }

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
        $reply->liked = false;
        $reply->user;
        $reply->media;
        return $reply;
    }

    public function retweet(Request $request , $id){
    $user = JWTAuth::user();
    $tweet = Tweet::findOrFail($id);
    $id = $request->tweet_id;
    $retweet = $tweet->retweets()->where('user_id', $user->id)->first();
        if ($retweet) {
            $retweet->delete();
        } else {
            $tweet->retweets()->create([
            'user_id' => JWTAuth::user()->id,
            'text' => $request->text||null ,
            ]);
        }
            $tweet = $this->formatTweet($tweet);
            return $tweet;
            $tweet->update([
                'views_count' => $tweet->views_count + 1
            ]);
        return "Tweet not found";
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

    //views count
    public function view($id)
    {
        $tweet = Tweet::find($id);
        $tweet->update([
            'views_count' => $tweet->views_count + 1
        ]);
        $tweet = $this->formatTweet($tweet);
        return $tweet;
    }


    public function delete($id)
    {
        try {
            $tweet = Tweet::find($id);
            if ($tweet->user_id != JWTAuth::user()->id) {
                return response()->json(['message' => 'You are not authorized to delete this tweet'], 401);
            }
            $tweet->likes()->delete();
            $tweet->replies()->delete();
            // $tweet->views()->delete();
            $tweet->media()->delete();
            $tweet->tags()->detach();
            // $tweet->retweets()->delete();
            $tweet->delete();
            return response()->json(['message' => 'Tweet deleted successfully'], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Tweet not found'], 404);
        }
    }
}
