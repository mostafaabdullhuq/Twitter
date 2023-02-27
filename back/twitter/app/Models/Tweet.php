<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Reply;
use App\Models\Like;

class Tweet extends Model
{
    use HasFactory;


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
        );
    }

    public function replyWithUserID($userID)
    {

        return $this->morphMany(
            Reply::class,
            'repliable'
        )->get()->where('user_id', $userID);
    }


    public function media()
    {
        return $this->morphMany(
            Media::class,
            'parent'
        );
    }

    public function likes()
    {
        return $this->morphMany(Like::class, 'liked');
    }

    public function Views()
    {
        return $this->morphMany(View::class, 'viewed');
    }

    public function retweets()
    {
        return $this->morphMany(Retweet::class, 'retweetable');
    }

    public function likedByUserID($id)
    {
        return $this->likes()->where('user_id', $id)->exists();
    }


}
