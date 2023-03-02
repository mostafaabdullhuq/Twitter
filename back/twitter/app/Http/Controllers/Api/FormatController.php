<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use JWTAuth;

class FormatController extends Controller
{


    public function formatTweet($tweet, $userID = 0)
    {
        // add user object to the tweet object and delete security sensitive information
        $tweet->liked = $tweet->likedByUserID(JWTAuth::user()->id);
        $tweet->bookmarked = JWTAuth::user()->isBookmarked($tweet->id);
        // $tweet->retweeted = JWTAuth::user()->isRetweeted($tweet->id);
        $tweet->replies_count = $tweet->replies->count();
        $tweet->likes_count = $tweet->likes->count();
        $tweet->retweets_count = $tweet->retweets->count();
        $tweet->user = $this->formatUser($tweet->user);
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
            $reply->user = $this->formatUser($reply->user);
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
            $mention->mentioned_user = $this->formatUser($mention->mentionedUser);
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
            $tweet->user = $this->formatUser($tweet->user);
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



    public function formatUser($user)
    {
        $user->followers_count = $user->followers()->count();
        $user->followings_count = $user->followings()->count();
        $user->tweets_count = $user->tweets()->count();
        $user->likes_count = $user->likes()->count();
        $user->replies_count = $user->replies()->count();
        $user->retweets_count = $user->retweets()->count();
        $user->views_count = $user->views()->count();
        $user->is_followed = $user->isFollowedByUserID(JWTAuth::user()->id);
        $user->is_following = JWTAuth::user()->isFollowing($user);
        // $user->is_following = false;
        $user->profile_picture = $user->profile_picture ? asset('storage/profile_pictures/' . $user->profile_picture) : null;
        $user->cover_picture = $user->cover_picture ? asset('storage/cover_pictures/' . $user->cover_picture) : null;
        unset(
            $user->email_verified_at,
            $user->password,
            $user->remember_token,
            $user->updated_at,
            $user->facebook_access_token,
            $user->google_access_token,
        );
        return $user;
    }
}
