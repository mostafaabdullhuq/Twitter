<?php

namespace App\Http\Controllers;

use App\Models\User;
use Auth;
use Laravel\Socialite\Facades\Socialite;
use Redirect;
use Illuminate\Http\Request;

class FacebookController extends Controller
{
    public function redirectFacebook()
    {
        return Socialite::driver('facebook')->stateless()->redirect();
    }

    public function callbackFacebook()
    {
        try {

            $facebook_user = Socialite::driver('facebook')->stateless()->user();
            $user = User::where('facebook_access_token', $facebook_user->getId())->first();
            if (!$user) {
                $new_user = User::create([
                    'email' => $facebook_user->getEmail(),
                    'facebook_access_token' => $facebook_user->getId(),
                ]);
                Auth::login($new_user);
                // return redirect('/home');
            } else {
                Auth::login($user);
                // return redirect('/home');

            }
        } catch (\Throwable $th) {
            dd('Error ', $th->getMessage());
        }
    }
}
