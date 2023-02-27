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
use App\Http\Controllers\changePasswordSettingController;


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
    Route::Post('changePassword', [changePasswordSettingController::class, 'passwordSetting']);

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
});

Route::group([
    'middleware' => 'api',
    'prefix' => 'tweet'
], function () {
    Route::post('', [TweetController::class, 'create']);
    Route::get('me', [TweetController::class, 'me']);
    Route::get('foryou', [TweetController::class, 'homeforyou']);
    Route::get('following', [TweetController::class, 'homefollowing']);
    Route::get('replies', [TweetController::class, 'get_User_Replies']);
    Route::get('likes' , [TweetController::class, 'get_User_Likes']);
    Route::get('retweets', [TweetController::class, 'get_User_Retweets']);
    Route::post('{id}/edit', [TweetController::class, 'edit']);
    Route::post('{id}/retweet', [TweetController::class, 'retweet']);
    Route::post('{id}/reply', [TweetController::class, 'reply']);
    Route::get('{id}/like', [TweetController::class, 'likeToggle']);
    Route::post('{id}/delete', [TweetController::class, 'delete']);
    Route::post('{id}', [TweetController::class, 'view']);
    // Route::get('{id}', [TweetController::class, 'details']);
});


Route::group([
    'middleware' => 'api',
    'prefix' => 'reply'
], function () {
    Route::post('{id}/like', [ReplyController::class, 'likeToggle']);
    // Route::post('{id}/unlike', [ReplyController::class, 'unlike']);
    Route::post('{id}/view', [ReplyController::class, 'view']);
    Route::post('{id}/edit', [ReplyController::class, 'edit']);
    Route::post('{id}/delete', [ReplyController::class, 'delete']);
    Route::post('{id}/reply', [ReplyController::class, 'reply']);
});
