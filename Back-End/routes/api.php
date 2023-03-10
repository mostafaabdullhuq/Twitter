<?php

use App\Http\Controllers\Api\HashtagController;
use App\Http\Controllers\Api\SearchController;
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
use App\Http\Controllers\Api\ChatController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\NotificationController;

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
    Route::get('bookmarks', [UserController::class, 'bookmarks']);
    Route::post('bookmarks/create', [UserController::class, 'addBookmark']);
    Route::delete('{id}/delete', [UserController::class, 'deleteBookmark']);
    Route::post('follow-unfollow', [FollowingController::class, 'store']);
    Route::post('block-user', [BlockController::class, 'store']);
    Route::get('get-followers', [FollowingController::class, 'get_followers']);
    Route::get('get-followings', [FollowingController::class, 'get_followings']);
    Route::get('get-all-followers', [UserController::class, 'get_all_followers']);
    Route::get('get-all-followings', [UserController::class, 'get_all_followings']);
    Route::get('{username}/get-a-followings', [UserController::class, 'get_a_followings']);
    Route::get('{username}/get-a-followers', [UserController::class, 'get_a_followers']);
    Route::post('get-a-followers', [UserController::class, 'get_a_followers']);
    Route::get('get-all', [UserController::class, 'get_all_users']);
    Route::get('get-user/{id}', [UserController::class, 'get_user']);
});

Route::group([
    'middleware' => 'api',
    'prefix' => 'tweet'
], function () {
    Route::post('{id}/retweet', [TweetController::class, 'retweet']);
    Route::get('{retweet_id}/retweet/view', [TweetController::class, 'viewsRetweet']);
    Route::get('{id}/getretweet', [TweetController::class, 'getRetweets']);
    Route::post('', [TweetController::class, 'create']);
    Route::get('{username}/me', [TweetController::class, 'me']);
    Route::get('foryou', [TweetController::class, 'homeforyou']);
    Route::get('following', [TweetController::class, 'homefollowing']);
    Route::get('{username}/media', [TweetController::class, 'get_User_Media']);
    Route::get('{username}/replies', [TweetController::class, 'get_User_Replies']);
    Route::get('{username}/likes', [TweetController::class, 'get_User_Likes']);
    Route::get('{username}/retweets', [TweetController::class, 'get_User_Retweets']);
    Route::post('{id}/edit', [TweetController::class, 'edit']);
    Route::post('{id}/reply', [TweetController::class, 'reply']);
    Route::get('{id}/like', [TweetController::class, 'likeToggle']);
    Route::delete('{id}/delete', [TweetController::class, 'delete']);
    Route::get('{id}/view', [TweetController::class, 'view']);
    Route::get('trending/{count}', [TweetController::class, 'highestTweets']);
    Route::get('{id}', [TweetController::class, 'details']);
});

Route::group([
    'middleware' => 'api',
    'prefix' => 'reply'
], function () {
    Route::get('{id}/like', [ReplyController::class, 'likeToggle']);
    Route::post('{id}/view', [ReplyController::class, 'view']);
    Route::post('{id}/edit', [ReplyController::class, 'edit']);
    Route::delete('{id}/delete', [ReplyController::class, 'delete']);
    Route::post('{id}/reply', [ReplyController::class, 'reply']);
});


Route::group([
    'middleware' => 'api',
    'prefix' => 'hashtag'
], function () {
    Route::post('trending/', [HashtagController::class, 'trends']);
    Route::get('search/{hashtag}', [HashtagController::class, 'search']);
});


Route::group([
    'middleware' => 'api',
    'prefix' => 'search'
], function () {
    Route::post('', [SearchController::class, 'search']);
});




//Chat App
Route::group([
    'middleware' => 'api',
], function () {
    Route::post('messages', [ChatController::class, 'message']);
});

Route::group(
    [
        'middleware' => 'api',
        'prefix' => 'notifications'
    ],
    function () {
        Route::get('', [NotificationController::class, 'sendNotification']);
    }
);

// Route::group([
//     'middleware' => 'api',
//     'prefix' => 'tweet'
// ], function () {
//     Route::get('{username}/me', [TweetController::class, 'me']);
//     Route::get('{username}/media', [TweetController::class, 'get_User_Media']);
//     Route::get('{username}/replies', [TweetController::class, 'get_User_Replies']);
//     Route::get('{username}/likes', [TweetController::class, 'get_User_Likes']);
// });