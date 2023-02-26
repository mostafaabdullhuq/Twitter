<?php

use App\Http\Controllers\Api\TweetController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ResetPasswordController;
use App\Http\Controllers\ChangePasswordController;
use App\Http\Controllers\ReplyController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\GoogleController;
use App\Http\Controllers\FacebookController;
use App\Http\Controllers\FollowingController;
use App\Http\Controllers\BlockController;
use App\Http\Controllers\LikeController;
use App\Http\Controllers\UpdateDataController;

Route::group([
    'middleware' => 'api',
    'prefix' => 'auth'
], function () {
    Route::post('login', [AuthController::class, 'login']);
    Route::post('signup', [AuthController::class, 'signup']);
    Route::post('logout', [AuthController::class, 'logout']);
    Route::post('refresh', [AuthController::class, 'refresh']);
    Route::post('me', [AuthController::class, 'me']);
    // Route::get('/redirect/google', [GoogleController::class, 'redirectGoogle']);
    // Route::get('/callback/google', [GoogleController::class, 'callbackGoogle']);
    // Route::get('/redirect/facebook', [FacebookController::class, 'redirectFacebook']);
    // Route::post('/callback/facebook', [FacebookController::class, 'callbackFacebook']);
    Route::post('sendPasswordResetLink', [ResetPasswordController::class, 'sendEmail']);
    Route::post('resetPassword', [ChangePasswordController::class, 'process']);
    Route::post('updateUser', [UpdateDataController::class, 'update']);

});


Route::group([
    'middleware' => 'api',
    'prefix' => 'user'
], function () {

    Route::get('index', [UserController::class, 'index']);
    Route::post('update', [UserController::class, 'update']);
    Route::delete('delete', [UserController::class, 'destroy']);
    Route::post('follow-unfollow', [FollowingController::class, 'store']);
    Route::post('block-user', [BlockController::class, 'store']);
    Route::post('get-followers', [FollowingController::class, 'get_followers']);
    Route::post('get-followings', [FollowingController::class, 'get_followings']);
    Route::post('like', [LikeController::class, '']);

});

Route::group([
    'middleware' => 'api',
    'prefix' => 'tweet'
], function () {

    Route::post('', [TweetController::class, 'create']);
    Route::get('me', [TweetController::class, 'me']);
    Route::get('foryou', [TweetController::class, 'homeforyou']);
    Route::get('following', [TweetController::class, 'homefollowing']);
    Route::post('edit/{id}', [TweetController::class, 'edit']);
    Route::post('delete/{id}', [TweetController::class, 'delete']);
    Route::post('like/{id}', [TweetController::class, 'like']);
    Route::post('unlike/{id}', [TweetController::class, 'unlike']);
    Route::post('retweet/{id}', [TweetController::class, 'retweet']);
    Route::post('{id}/reply', [ReplyController::class, 'store']);

    // Route::get('retweets', [TweetController::class, 'get_User_Retweets']);
    Route::get('replies', [TweetController::class, 'get_User_Replies']);
    // Route::get('{tweet_id}/replies', [TweetController::class, 'get_User_Replies']);
    // Route::get('{tweet_id}/reply' ,[TweetController::class, 'reply']);
    Route::post('{tweet_id}/like', [TweetController::class, 'like']);
    Route::delete('{tweet_id}/unlike', [TweetController::class, 'unlike']);
    Route::get('{id}', [TweetController::class, 'details']);

});






# php artisan key:generate
# php artisan jwt:secret
# jwt-auth secret [5M5guU5h5DjiOjDVbi9lB4OL2UHMujOgly58r0mnVf4jqytIERVC85RpBSxqnu5C] set successfully..
