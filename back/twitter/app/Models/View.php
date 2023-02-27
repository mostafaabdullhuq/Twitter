<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class View extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'viewed_id',
        'viewed_type'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function viewed()
    {
        return $this->morphTo();
    }

}
