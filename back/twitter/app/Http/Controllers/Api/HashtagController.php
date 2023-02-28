<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Tweet;
use Illuminate\Http\Request;
use JWTAuth;

use function PHPSTORM_META\type;

class HashtagController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');
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
            // $tweet->views_count = $tweet->views->count();
        }
        return $tweets;
    }

    // get top 10 trending hashtags and their tweets count
    public function trends($days)
    {
        $trends = Tweet::selectRaw('tags.name, count(*) as count')
            ->join('taggables', 'taggables.taggable_id', '=', 'tweets.id')
            ->join('tags', 'tags.id', '=', 'taggables.tag_id')
            ->where('taggables.taggable_type', 'App\Models\Tweet')
            ->where('tweets.created_at', '>=', now()->subDays(((int) $days) || 1))
            ->groupBy('tags.name')
            ->orderBy('count', 'desc')
            ->limit(10)
            ->get();

        foreach ($trends as $key => $trend) {
            $trend->name = json_decode($trend->name)->en;
            $trend->tweets_count = $trend->count;
            unset($trend->count);
        }
        return $trends;
    }

    // get tweets by specific hashtag
    public function search($hashtag)
    {
        $tweets =  Tweet::withAnyTags([$hashtag])->get();
        return $this->formatTweets($tweets);
    }
}
