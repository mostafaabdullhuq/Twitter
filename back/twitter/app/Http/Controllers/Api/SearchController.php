<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\SearchRequest;
use App\Models\Tweet;
use App\Models\User;
use Illuminate\Http\Request;
use JWTAuth;

class SearchController extends Controller
{
    public function search(SearchRequest $request)
    {
        $data = $request->only(['type', 'query']);

        $type = $data['type'];
        $query = $data['query'];


        // if user want to search for tweets for specific hashtag
        if ($type === 'hashtag_tweets') {
            $tweets = $this->tweetsByHashtag($query);
            return [
                'hashtag' =>
                [
                    'name' => $query,
                    'tweets_count' => $tweets->count(),
                ],
                'tweets' => $tweets,
            ];
        }
        if ($type == 'users') {
            $users = $this->searchUsers($query);
            return $users;
        }
    }

    public function searchUsers($query)
    {
        $users = User::where('first_name', 'like', '%' . $query . '%')
            ->orWhere('username', 'like', '%' . $query . '%')
            ->orWhere('last_name', 'like', '%' . $query . '%')
            ->get();
        return $users;
    }


    // get tweets by specific hashtag
    public function tweetsByHashtag($hashtag)
    {
        $tweets =  Tweet::withAnyTags([$hashtag])->get();
        return $this->formatTweets($tweets);
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
}
