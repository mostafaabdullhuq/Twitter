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
use App\Models\Follow;
use App\Http\Controllers\Api\FormatController;
use Illuminate\Pagination\Cursor;

class TweetController extends Controller
{
    public $formatter;
    public $nextCursor = null;

    public function __construct()
    {
        $this->middleware('auth:api');
        $this->formatter = new FormatController();
    }


    // get logged in user tweets
    public function me($username)
    {

        $user = User::where('username', $username)->first();
        if ($user) {
            $tweets = $user->tweets()->latest()->get();
            // $cursor = $user->tweets()->latest()->cursorPaginate(15);
            // $nextCursor = $cursor->nextPageUrl();
            // $tweets = $cursor->items();
            $tweets = $this->formatter->formatTweets($tweets);
            $user = $this->formatter->formatUser($user);
            $user->followed_by = false;

            $following =Follow::select('following_id')->where('follower_id', JWTAuth::user()->id)->get();

            $arr = [];
            foreach($following as $k => $v ){
                if($v->following_id == $user->id){
                    $user->followed_by = true;
                }
            }
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
        $user = $this->formatter->formatUser($user);
        return [
            'user' => $user,
            'retweets' => $retweets
        ];
    }


    public function highestTweets($count)
    {

        $count = (int) $count ?? 20;
        // get top tweets with highest likes, replies and views
        $tweets = Tweet::withCount(['likes', 'replies', 'views'])
            ->orderBy('replies_count', 'desc')
            ->orderBy('likes_count', 'desc')
            ->orderBy('views_count', 'desc')
            ->take($count)
            ->get();
        $tweets = $this->formatter->formatTweets($tweets);
        return $tweets;
    }




    public function get_User_Replies($username)
    {
        $user = User::where('username', $username)->first();
        $tweets = [];
        $replies = $user->replies()->latest()->get();

        $user = $this->formatter->formatUser($user);
        foreach ($replies as $key => $reply) {
            $replyParent = $reply->repliable()->get()->first();
            if ($replyParent) {
                $tweet = $this->formatter->formatTweet($replyParent, $user->id);
                $tweets[] = $tweet;
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
        $user = $this->formatter->formatUser($user);

        $user->tweets_count = $user->likes()->count();


        foreach ($likes as $key => $like) {
            if ($like->liked_type == Tweet::class) {
                $tweet = Tweet::find($like->liked_id);
                if ($tweet) {
                    $tweets[] = $tweet;
                }
            }
        }
        $tweets = $this->formatter->formatTweets($tweets);


        return [
            'user' => $user,
            'tweets' => $tweets
        ];
    }

    public function get_User_Media($username)
    {
        $user = User::where('username', $username)->first();
        $tweets = $user->tweetsWithMedia;
        $user = $this->formatter->formatUser($user);
        $user->tweets_count = $user->tweetsWithMedia()->count();
        $tweets = $this->formatter->formatTweets($tweets);
        return [
            'user' => $user,
            'tweets' => $tweets
        ];
    }

    // get logged in user for you tweets (tweets of followings of the followings of the user)
    public function homeforyou(Request $request)
    {
        $nextCursor = $request->query('cursor') ?? null;
        $cursor = JWTAuth::user()->hforyou()->cursorPaginate(9, ['*'], 'cursor', Cursor::fromEncoded($nextCursor));
        $nextCursor = $cursor->nextCursor()?->encode() ?? null;
        $tweets = $cursor->items();
        $tweets = $this->formatter->formatTweets($tweets);
        return [
            'tweets' => $tweets,
            'nextCursor' => $nextCursor
        ];




        // $tweets = JWTAuth::user()->hforyou()->get();
        // $tweets = $this->formatter->formatTweets($tweets);
        // return $tweets;
    }

    // get logged in user for you tweets (followings tweets and user tweets ordered from newest to oldest)
    public function homefollowing(Request $request)
    {
        // get next cursor from params
        $nextCursor = $request->query('cursor') ?? null;
        $cursor = JWTAuth::user()->hfollowing()->cursorPaginate(9, ['*'], 'cursor', Cursor::fromEncoded($nextCursor));
        $nextCursor = $cursor->nextCursor()?->encode() ?? null;
        // get cursor only not full url
        // $nextCursor = $nextCursor ? explode('?cursor=', $nextCursor)[1] ?? null : null;
        $tweets = $cursor->items();
        $tweets = $this->formatter->formatTweets($tweets);
        return [
            'tweets' => $tweets,
            'nextCursor' => $nextCursor
        ];

        // // $tweets = JWTAuth::user()->hfollowing()->get();
        // $cursor = JWTAuth::user()->hfollowing()->cursorPaginate(1, ['*'], 'cursor', Cursor::fromEncoded($next));
        // $nextCursor = $cursor->nextCursor()->encode();
        // // get cursor only not full url
        // $nextCursor = $nextCursor ? explode('?cursor=', $nextCursor)[1] ?? null : null;
        // $tweets = $cursor->items();
        // $tweets = $this->formatter->formatTweets($tweets);
        // return [
        //     'tweets' => $tweets,
        //     'nextCursor' => $nextCursor
        // ];
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
        $tweet = $this->formatter->formatTweet($tweet);
        return $tweet;
    }


    public function details($id)
    {
        try {
            // Find the tweet with the given ID.
            $tweet = Tweet::findOrFail($id);
            // Format the tweet.
            $tweet = $this->formatter->formatTweet($tweet);
            return $tweet;
        } catch (
            \Illuminate\Database\Eloquent\ModelNotFoundException $e
        ) {
            return response()->json(['error' => 'Tweet not found.', 'code' => 1], 404);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage(), 'code' => 2], 500);
        }
    }




    public function reply($id, Request $request)
    {
        $request->validate([
            'text' => 'required |string|max:500',
        ]);
        $data = $request->only(
            [
                'text',
            ]
        );
        $tweet = Tweet::findOrFail($id);
        $reply = $tweet->replies()->create(
            [
                'text' => $data['text'],
                'user_id' => JWTAuth::user()->id,
            ]
        );
        $reply = $this->formatter->formatReply($reply);



        return $reply;
    }

    public function retweet(Request $request, $id)
    {
        $user = JWTAuth::user();
        $tweet = Tweet::findOrFail($id);
        $text = null;
        if ($request->text) {
            $text = $request->text;
        }
        // $id = $request->tweet_id;
        $retweet = $tweet->retweets()->where('user_id', $user->id)->first();
        if ($retweet) {
            $retweet->delete();
        } else {
            $tweet->retweets()->create([
                'user_id' => JWTAuth::user()->id,
                'text' => $text,
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
        $tweet->update([
            'views_count' => $tweet->views_count + 1
        ]);
        $tweet = $this->formatter->formatTweet($tweet);
        return $tweet;
    }

    public function view($id)
    {
        $tweet = Tweet::find($id);
        $tweet->update([
            'views_count' => $tweet->views_count + 1
        ]);
        $tweet = $this->formatter->formatTweet($tweet);
        return $tweet;
    }


    //Retweet views count
    // public function viewsRetweet($retweet_id)
    // {
    //     $retweets = Retweet::find($retweet_id);
    //     if ($retweets) {
    //         $retweets->update([
    //             'views_count' => $retweets->views_count + 1
    //         ]);
    //         return $retweets;
    //     }

    // }

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
        $tweet = $this->formatter->formatTweet($tweet);
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
            $tweet->media()->delete();
            $tweet->tags()->detach();
            $tweet->retweets()->delete();
            $tweet->mentions()->delete();
            // $tweet->notifications()->delete();
            $tweet->delete();
            return response()->json(['message' => 'Tweet deleted successfully'], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Tweet not found'], 404);
        }
    }
}
