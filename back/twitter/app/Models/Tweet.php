<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tweet extends Model
{
    use HasFactory;


    protected $fillable = [
        'text',
        'schedule_date_time',
        'user_id',
    ];
}
