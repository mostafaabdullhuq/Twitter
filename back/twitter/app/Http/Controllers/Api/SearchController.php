<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\SearchRequest;
use App\Models\Tweet;
use App\Models\User;
use Illuminate\Http\Request;
use JWTAuth;
use App\Http\Controllers\Api\FormatController;


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
        return $this->formatter->formatTweets($tweets);
    }
}
