<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Reply;

class Tweet extends Model
{
    use HasFactory;


    protected $fillable = [
        'text',
        'schedule_date_time',
        'user_id',
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
}
