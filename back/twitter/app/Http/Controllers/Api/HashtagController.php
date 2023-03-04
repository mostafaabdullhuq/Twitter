<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\PostTrendsRequest;
use App\Models\Tweet;
use Illuminate\Http\Request;
use JWTAuth;
use App\Http\Controllers\Api\FormatController;
use function PHPSTORM_META\type;

class HashtagController extends Controller
{
    // public function __construct()
    // {
    //     $this->middleware('auth:api');
    // }
    public $formatter;


    public function __construct()
    {
        $this->formatter = new FormatController();
    }
    // get top 10 trending hashtags and their tweets count
    public function trends(PostTrendsRequest $request)
    {
        $days = $request->days_count;
        $count = $request->hashtags_count;

        $trends = Tweet::selectRaw('tags.name, count(*) as count')
            ->join('taggables', 'taggables.taggable_id', '=', 'tweets.id')
            ->join('tags', 'tags.id', '=', 'taggables.tag_id')
            ->where('taggables.taggable_type', 'App\Models\Tweet')
            ->where('tweets.created_at', '>=', now()->subDays($days))
            ->groupBy('tags.name')
            ->orderBy('count', 'desc')
            ->limit($count)
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
        return $this->formatter->formatTweets($tweets);
    }
}