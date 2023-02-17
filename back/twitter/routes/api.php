<?php

use App\Http\Controllers\AuthController;


Route::group([

    'middleware' => 'api',
    'prefix' => 'auth'

], function () {
    Route::post('login', [AuthController::class, 'login']);
    Route::post('logout', [AuthController::class, 'logout']);
    Route::post('refresh', [AuthController::class, 'refresh']);
    Route::post('me', [AuthController::class, 'me']);
});






# php artisan key:generate
# php artisan jwt:secret
# jwt-auth secret [5M5guU5h5DjiOjDVbi9lB4OL2UHMujOgly58r0mnVf4jqytIERVC85RpBSxqnu5C] set successfully..