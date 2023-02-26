<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Like extends Model
{
    use HasFactory;
    protected $fillable = [
        'user_id',
        'liked_id',
        'liked_type'
    ];

    public function user()
    {

        return $this->belongsTo(User::class);
    }
    public function liked()
    {
        return $this->morphTo();
    }


}

