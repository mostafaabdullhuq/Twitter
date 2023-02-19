<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ResetPasswordController;




Route::group([

    'middleware' => 'api',
    'prefix' => 'auth'

], function () {
    Route::post('login', [AuthController::class, 'login']);
    Route::post('signup', [AuthController::class, 'signup']);
    Route::post('logout', [AuthController::class, 'logout']);
    Route::post('refresh', [AuthController::class, 'refresh']);
    Route::post('me', [AuthController::class, 'me']);
    Route::post('sendPasswordResetLink', [ResetPasswordController::class,'sendEmail']);
    // Route::post('resetPassword', [ChangePasswordController::class,'process']);
});






# php artisan key:generate
# php artisan jwt:secret
# jwt-auth secret [5M5guU5h5DjiOjDVbi9lB4OL2UHMujOgly58r0mnVf4jqytIERVC85RpBSxqnu5C] set successfully..