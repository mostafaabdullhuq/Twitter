<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Reply extends Model
{
    use HasFactory;

    protected $fillable = [
        'text',
        'user_id',
        'repliable_id',
        'repliable_type'
    ];



    public function user()
    {

        return $this->belongsTo(User::class);
    }

    public function repliable()
    {
        return $this->morphTo();
    }


    public function media()
    {
        return $this->morphMany(
            Media::class,
            'parent'
        );
    }
}