<?php

namespace App\Models;
// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
// use PHPOpenSourceSaver\JWTAuth\Contracts\JWTSubject;
use Tymon\JWTAuth\Contracts\JWTSubject;

class User extends Authenticatable implements JWTSubject
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'first_name',
        'last_name',
        'username',
        'email',
        'password',
        'gender',
        'views_count',
        'phone_number',
        'date_of_birth',
        'profile_picture',
        'cover_picture',
        'bio',
        'location',
        'website',

    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];



    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    /**
     * Return a key value array, containing any custom claims to be added to the JWT.
     *
     * @return array
     */
    public function getJWTCustomClaims()
    {
        return [];
    }
    public function setPasswordAttribute($value)
    {
        $this->attributes['password'] = bcrypt($value);
    }

    public function tweets()
    {
        return  $this->hasMany(Tweet::class);
    }

    public function tweetsWithMedia()
    {
        return $this->hasMany(Tweet::class)
            ->whereHas('media');
    }




    public function likes()
    {
        return $this->hasMany(Like::class);
    }

    public function Views()
    {
        return $this->hasMany(View::class);
    }

    public function replies()
    {
        return $this->hasMany(Reply::class);
    }

    public function bookmarks()
    {
        return $this->hasMany(Bookmark::class);
    }

    public function isBookmarked($tweet_id)
    {
        return $this->bookmarks()->where('tweet_id', $tweet_id)->exists();
    }

    // get the users who follow the current user
    public function followers()
    {
        return $this->belongsToMany(User::class, 'follows', 'following_id', 'follower_id');
    }

    // get the users who is followed by the current user
    public function followings()
    {
        return $this->belongsToMany(User::class, 'follows', 'follower_id', 'following_id');
    }

    // follow new user
    public function follow(User $user)
    {
        return $this->followings()->save($user);
    }

    public function unfollow(User $user)
    {
        return $this->followings()->detach($user);
    }

    public function isFollowing(User $user)
    {
        return $this->followings()->where('following_id', $user->id)->exists();
    }

    public function isFollowedBy(User $user)
    {
        return $this->followers()->where('follower_id', $user->id)->exists();
    }

    // get all following people tweets and user tweets also, ordered from newest to oldest
    public function hforyou()
    {
        // get the users who the current user follow
        $followingUsers = $this->followings()->get();

        // get the ids of the users who the current user follow
        $totalUsers = $followingUsers->pluck("id")->toArray();

        // get the ids of the users who the users who the current user follow follow
        foreach ($followingUsers as  $value) {
            $currentFollowingFollowings = $value->followings()->pluck("following_id");
            $totalUsers = array_merge($totalUsers, $currentFollowingFollowings->toArray());
        }

        // remove duplicate ids
        $totalUsers = array_unique($totalUsers);
        // remove the current user id
        unset($totalUsers[array_search($this->id, $totalUsers)]);

        $totalUsers[] = $this->id;

        // get the tweets of the users who the current user follow and the users who the users who the current user follow follow

        return Tweet::whereIn('user_id', $totalUsers)
            ->latest();
    }

    public function hfollowing()
    {
        return Tweet::whereIn('user_id', $this->followings()->pluck('following_id'))
            ->latest();
    }
    public function verificationStatus()
    {
        return $this->hasOne(VerificationStatus::class);
    }
}
