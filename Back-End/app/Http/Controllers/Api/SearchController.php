<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\SearchRequest;
use App\Models\Tweet;
use App\Models\User;
use Illuminate\Http\Request;
use JWTAuth;
use App\Http\Controllers\Api\FormatController;
use Spatie\Tags\Tag;

class SearchController extends Controller
{
    public $formatter;
    public function __construct()
    {
        $this->middleware('auth:api');
        $this->formatter = new FormatController();
    }

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
            $users = $this->formatter->formatUsers($users);
            return $users;
        }

        if ($type == 'tweets') {
            $tweets = $this->searchTweet($query);
            $tweets = $this->formatter->formatTweets($tweets);
            return $tweets;
        }
        if ($type == 'hashtags') {

            // get the text only of hashtag
            $query = preg_match('/([\p{Pc}\p{N}\p{L}\p{Mn}]+)/u', $query, $hashtagValue);
            $hashtagValue = $hashtagValue['0'];

            // get the hashtags that contains the given text and format them
            $hashtags = Tag::containing($hashtagValue)->get();
            $hashtags = $this->formatter->formatHashtags($hashtags);
            return $hashtags;
        }
        if ($type == 'user_tweets') {
            $tweets = $this->searchTweetsByUser($query);
            $tweets = $this->formatter->formatTweets($tweets);
            return $tweets;
        }
    }

    // This function searches the users table for users with a first name,
    // last name, or username that matches the query. It also searches for
    // users whose full name matches the query. It then returns the first
    // 5 results.

    public function searchUsers($query)
    {

        $query = str_replace('@', '', $query);
        $users = User::where('first_name', 'like', '%' . $query . '%')
            ->orWhere('username', 'like', '%' . $query . '%')
            ->orWhere('last_name', 'like', '%' . $query . '%')
            ->orWhereRaw("CONCAT(first_name, ' ', last_name) LIKE ?", ["%{$query}%"])
            ->limit(5)
            ->get();
        return $users;
    }

    public function searchTweet($query)
    {
        $tweets = Tweet::where('text', 'like', '%' . $query . '%')
            ->orderBy('created_at', 'desc')
            ->get();
        return $tweets;
    }


    // get tweets by specific hashtag
    public function tweetsByHashtag($hashtag)
    {
        $tweets =  Tweet::withAnyTags([$hashtag])->get();
        return $this->formatter->formatTweets($tweets);
    }

    public function searchTweetsByUser($query)
    {
        $user = User::where('username', $query)->first();
        if ($user) {
            $tweets = $user->tweets;
        } else {
            $tweets = [];
        }
        return $tweets;
    }
}
