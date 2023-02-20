<?php

use App\Http\Controllers\Api\TweetController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ResetPasswordController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\GoogleController;

Route::group([
    'middleware' => 'api',
    'prefix' => 'auth'
], function () {
    Route::post('login', [AuthController::class, 'login']);
    Route::post('signup', [AuthController::class, 'signup']);
    Route::post('logout', [AuthController::class, 'logout']);
    Route::post('refresh', [AuthController::class, 'refresh']);
    Route::post('me', [AuthController::class, 'me']);
    Route::get('/redirect/google', [GoogleController::class, 'redirectGoogle']);
    Route::get('/callback/google', [GoogleController::class, 'callbackGoogle']);
    Route::post('sendPasswordResetLink', [ResetPasswordController::class, 'sendEmail']);
    Route::post('resetPassword', [ChangePasswordController::class, 'process']);
});


Route::group([
    'middleware' => 'api',
    'prefix' => 'user'
], function () {

    Route::get('index', [UserController::class, 'index']);
    Route::post('update', [UserController::class, 'update']);
    Route::post('destroy', [UserController::class, 'destroy']);
});

Route::group([
    'middleware' => 'api',
    'prefix' => 'tweet'
], function () {

    Route::get('me', [TweetController::class, 'me']);
    Route::get('foryou', [TweetController::class, 'homeforyou']);
    Route::get('following', [TweetController::class, 'homefollowing']);
    Route::post('create', [TweetController::class, 'create']);
    Route::get('details/{id}', [TweetController::class, 'details']);
    Route::post('edit/{id}', [TweetController::class, 'edit']);
    Route::post('delete/{id}', [TweetController::class, 'delete']);
    Route::post('like/{id}', [TweetController::class, 'like']);
    Route::post('unlike/{id}', [TweetController::class, 'unlike']);
    Route::post('retweet/{id}', [TweetController::class, 'retweet']);
});






# php artisan key:generate
# php artisan jwt:secret
# jwt-auth secret [5M5guU5h5DjiOjDVbi9lB4OL2UHMujOgly58r0mnVf4jqytIERVC85RpBSxqnu5C] set successfully..
