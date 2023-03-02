<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Retweet;
use JWTAuth;

class Reply extends Model
{
    use HasFactory;

    protected $fillable = [
        'text',
        'user_id',
        'repliable_id',
        'repliable_type',
        'views_count',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function repliable()
    {
        return $this->morphTo();
    }



    public function replies()
    {
        return $this->morphMany(Reply::class, 'repliable');
    }

    public function media()
    {
        return $this->morphMany(Media::class, 'parent');
    }

    public function likes()
    {
        return $this->morphMany(Like::class, 'liked');
    }

    public function retweets()
    {
        return $this->morphMany(Like::class, 'retweetable');
    }

    public function retweet()
    {;
    }
    public function Views()
    {
        return $this->morphMany(View::class, 'viewed');
    }

    public function replyWithUserID($userID)
    {
        return $this->morphMany(Reply::class, 'repliable')->get()->where('user_id', $userID);
    }

    public function likedByUserID($id)
    {
        return $this->likes()->where('user_id', $id)->exists();
    }
}
