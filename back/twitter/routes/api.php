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
# jwt-auth secret [v9m6605MEHxcHrgC41BFyJbAOY19UH8Ypa1udnthDFuLN96IUVgD3iDgI2zfLKTa] set successfully.