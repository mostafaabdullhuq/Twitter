<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Reply;
use App\Models\Like;
use App\Models\Retweet;
use JWTAuth;
use Spatie\Tags\HasTags;

class Tweet extends Model
{
    use HasFactory;
    use HasTags;
    protected $fillable = [
        'text',
        'schedule_date_time',
        'user_id',
        'views_count',

    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function replies()
    {
        return $this->morphMany(
            Reply::class,
            'repliable'
        )
            ->latest();
    }

    public function replyWithUserID($userID)
    {
        return $this->morphMany(
            Reply::class,
            'repliable'
        )->get()->where('user_id', $userID)->latest();
    }

    public function mentions()
    {
        return $this->morphMany(Mention::class, 'mentionable');
    }

    public function media()
    {
        return $this->morphMany(
            Media::class,
            'parent'
        );
    }

    public function retweets()
    {
        return $this->morphMany(Retweet::class, 'retweetable');
    }

    public function likes()
    {
        return $this->morphMany(Like::class, 'liked');

    }

    public function likedByUserID($id)
    {
        return $this->likes()->where('user_id', $id)->exists();
    }

    // public function viewRetweet()
    // {
    //     return $this->morphMany(View::class, 'viewed');
    // }

    public function Views()
    {
        return $this->morphMany(View::class, 'viewed');
    }

    public function isRetweeted ($id){
        return $this->retweets()->where('user_id', $id)->exists();
    }

    public function formatTweet($userID = 0)
    {
        // add user object to the tweet object and delete security sensitive information
        $this->liked = $this->likedByUserID(JWTAuth::user()->id);
        $this->bookmarked = JWTAuth::user()->isBookmarked($this->id);
        $this->retweeted =  $this->isRetweeted(JWTAuth::user()->id);
        $this->replies_count = $this->replies->count();
        $this->likes_count = $this->likes->count();
        $this->user;
        unset($this->user->google_access_token);
        unset($this->user->facebook_access_token);
        unset($this->user->email_verified_at);
        unset($this->user->updated_at);
        unset($this->user_id);
        // get the media of the tweet and update it's url values and remove security sensitive info
        $media = $this->media;
        if ($media->count()) {
            foreach ($media as $key => $value) {
                unset($value['parent_id']);
                unset($value['parent_type']);
                unset($value['updated_at']);
                $value->media_url = asset('storage/media/' . $value->media_url);
            }
        }
        $replies = $userID ? $this->replyWithUserID($userID) : $this->replies;
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
            $reply->retweets_count = $reply->retweets->count();
        }
        $this->replies = $replies;
        $this->user->followers_count = $this->user->followers()->count();
        $this->user->followings_count = $this->user->followings()->count();
        $this->user->tweets_count = $this->user->tweets()->count();
        $tags = $this->tags;
        foreach ($tags as $key => $tag) {
            unset($tag->pivot);
            unset($tag->created_at);
            unset($tag->updated_at);
            unset($tag->order_column);
        }
        $this->tags = $tags;
        $mentions = $this->mentions;
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
        $this->mentions = $mentions;
        return $this;
    }
}
