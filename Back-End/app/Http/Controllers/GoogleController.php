<?php

namespace App\Http\Controllers;

use App\Models\User;
use Auth;
use Illuminate\Http\Request;
use Laravel\Socialite\Facades\Socialite;
use Redirect;

class GoogleController extends Controller
{
    public function redirectGoogle (){
        return Socialite::driver('google')->stateless()->redirect();
    }

    public function callbackGoogle(){
        try {
            $google_user = Socialite::driver('google')->stateless()->user();
            $user = User::where('google_access_token', $google_user->getId())->first();

            if (!$user) {
                $new_user = User::create([
                'email' => $google_user->getEmail(),
                'google_access_token' => $google_user ->getId(),

                    ]);
                    Auth::login($new_user);
            }
            else {
                Auth::login($user);

            }
        }
        catch (\Throwable $th){
            dd('Error ', $th->getMessage());
        }
    }
}
