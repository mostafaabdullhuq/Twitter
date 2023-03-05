<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Retweet extends Model
{
    use HasFactory;
    protected $fillable = [
        'user_id',
        'text',
        'retweetable_id',
        'retweetable_type',
        'views_count',
    ];


    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function tweet(){
        return $this->belongsTo(Tweet::class);
    }

    public function retweetable()
    {
        return $this->morphTo();
    }

    public function like()
    {
        return $this->morphMany(Like::class, 'liked');
    }

    public function viewsRetweet($id)
    {
        return $this->morphMany(View::class, 'viewed');
    }

}
