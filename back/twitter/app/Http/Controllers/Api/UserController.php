<?php

namespace App\Http\Controllers\Api;


use App\Http\Controllers\Controller;
use App\Models\Bookmark;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Tweet;
use JWTAuth;
use App\Http\Requests\UpdateUserData;


class UserController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');
    }

    public function index()
    {
        $user = auth()->user();
        $user->followers_count = $user->followers()->count();
        $user->followings_count = $user->followings()->count();
        $user->tweets_count = $user->tweets()->count();
        $user->is_following = false;

        return $user;
    }

    // public function update(UpdateUserData $request)
    // {
    //     try {
    //         // get only required from request
    //         $data = $request->only([
    //             'first_name', 'last_name', 'username', 'bio', 'location', 'website', 'phone_number', 'date_of_birth', 'is_cover_removed'
    //         ]);


    //         // if any input not given, set it as null

    //         $data['first_name'] = $data['first_name'] ?? null;
    //         $data['last_name'] = $data['last_name'] ?? null;
    //         $data['username'] = $data['username'] ?? null;
    //         $data['bio'] = $data['bio'] ?? null;
    //         $data['location'] = $data['location'] ?? null;
    //         $data['website'] = $data['website'] ?? null;
    //         $data['phone_number'] = $data['phone_number'] ?? null;
    //         $data['date_of_birth'] = $data['date_of_birth'] ?? null;

    //         $userProfileImage = $request->file('profile_picture');
    //         $userCoverImage = $request->file('cover_picture');
    //         $user = auth()->user();

    //         if ($userProfileImage) {
    //             $userProfileImage = $userProfileImage->store('public/profile_pictures') ?? null;
    //             $userProfileImage = $userProfileImage ? explode('/', $userProfileImage)[2] : null;
    //             $data['profile_picture'] = $userProfileImage;
    //         }


    //         if ($userCoverImage) {
    //             $userCoverImage = $userCoverImage->store('public/cover_pictures') ?? null;
    //             $userCoverImage = $userCoverImage ? explode('/', $userCoverImage)[2] : null;
    //             $data['cover_picture'] = $userCoverImage;
    //         } else if (isset($data['is_cover_removed'])) {
    //             return $data['is_cover_removed'];
    //             $data['cover_picture'] = null;
    //         }

    //         $user->update($data);

    //         $user = $this->formatUser($user);
    //         return $user;
    //     } catch (\Exception $e) {
    //         return response()->json(['message' => $e], 500);
    //     }
    // }
    //getBookmarked Tweets
    public function bookmarks(Request $request)
    {
        $user = JWTAuth::user();
        $tweets = [];
        $user->followers_count = $user->followers()->count();
        $user->followings_count = $user->followings()->count();
        $user->tweets_count = $user->tweets()->count();
        $tweets = $this->formatTweets($tweets);
        $bookmarks = $user->bookmarks;
        foreach ($bookmarks as $bookmark) {
            $tweets[] = $bookmark->tweet;
        }
        $tweets = $this->formatTweets($tweets);
        return [
            'user' => $user,
            'tweets' => $tweets
        ];
    }

    //deleteBookmark
    // public function deleteBookmark($id)
    // {
    //     try {
    //         $bookmark = Bookmark::find($id);
    //         $bookmark->delete();
    //         return response()->json(['message' => 'Removed from bookmarks'], 200);
    //     } catch (\Exception $e) {
    //         return response()->json(['message' => 'not bookmarked'], 404);
    //     }
    // }
    //addTweetBookmark
    public function addBookmark(Request $request)
    {
        $request->validate([
            'tweet_id' => 'required'
        ]);
        $tweetID = $request->tweet_id;
        $user = JWTAuth::user();
        $tweet = Tweet::findOrFail($tweetID);
        if ($tweet) {
            $bookmark = $user->bookmarks()->where('tweet_id', $tweetID)->first();
            if ($bookmark) {
                $bookmark->delete();
            } else {
                $user->bookmarks()->create(
                    [
                        'tweet_id' => $tweetID,
                    ]
                );
            }
            $tweet = $this->formatTweet($tweet);
            return  $tweet;
        }
        return "Tweet not found";
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

        $tweet->liked = $tweet->likedByUserID(JWTAuth::user()->id);

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
            $reply->retweets_count = random_int(0, 999999999);
        }
        $tweet->replies = $replies;
        $tweet->user->followers_count = $tweet->user->followers()->count();
        $tweet->user->followings_count = $tweet->user->followings()->count();
        $tweet->user->tweets_count = $tweet->user->tweets()->count();
        $tweet->replies_count = $tweet->replies->count();
        $tweet->likes_count = $tweet->likes->count();
        // $tweet->views_count = $tweet->views->count();
        $tweet->bookmarked = JWTAuth::user()->isBookmarked($tweet->id);
        // $tweet->retweeted = JWTAuth::user()->isRetweeted($tweet->id);

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
            // $tweet->views_count = $tweet->views->count();
        }
        return $tweets;
    }
    public function get_all_users()
    {
        $users = User::all();
        if (auth()->check()) {
            $authUser = auth()->user();
            $authUser->followers_count = $authUser->followers()->count();
            $authUser->followings_count = $authUser->followings()->count();
            $authUserFollowingIds = $authUser->followings()->get()->pluck('id')->toArray();
        }
        foreach ($users as $user) {
            $user->followers_count = $user->followers()->count();
            $user->followings_count = $user->followings()->count();
            $user->followers = $user->followers()->get()->pluck('id')->toArray();
            if (auth()->check()) {
                $user->followed_by = in_array($authUser->id, $user->followers);
                $user->following = in_array($user->id, $authUserFollowingIds);
            }
        }
        return $users;
    }

    // public function get_all_users()
    // {
    //     $users = User::all();
    //     if (auth()->check()) {
    //         $authUser = auth()->user();
    //         $authUser->followers_count = $authUser->followers()->count();
    //         $authUser->followings_count = $authUser->followings()->count();
    //     }
    //     foreach ($users as $user) {
    //         $user->followers_count = $user->followers()->count();
    //         $user->followings_count = $user->followings()->count();
    //         $user->followers = $user->followers()->get()->pluck('id')->toArray();
    //     }
    //     return $users;
    // }



    public function destroy(Request $request)
    {
        $request->user()->delete();

        return response()->json(['message' => 'user permanently deleted '], 500);
    }
}
