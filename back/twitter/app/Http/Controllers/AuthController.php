<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\SignUpRequest;
use App\Models\User;
use Carbon\Carbon;
use JWTAuth;

class AuthController extends Controller
{

    /**
     * Create a new AuthController instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['login', 'signup']]);
    }

    /**
     * Get a JWT via given credentials.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function login()
    {
        $credentials = request(['email', 'password']);

        // set token expiration date
        $minutes = 60;
        $hours = 24;
        $days = 7;
        JWTAuth::factory()->setTTL($minutes * $hours * $days);

        // attempt to login to account
        if (!$token = JWTAuth::attempt($credentials)) {
            return response()->json(['error' => 'Email or Password doesn\'t exist'], 401);
        }

        return $this->respondWithToken($token);
    }


    public function signup(SignUpRequest $request)
    {
        // take the email address identifier and remove domain, and get the leading 12 characters of them
        $username = substr((explode('@', $request->email)[0]), 0, 12);

        // check if there's usernames like the current username already exists in database and get the number of dupplications
        $duplicationNum = (User::where('username', 'like', '%' . $username . '%')->count());

        // if there's no duplication, then the username will be the same as the email address identifier, else add 1 to the dupplication number and append it to the username
        $username = $username . ($duplicationNum ? $duplicationNum + 1 : '');
        $user = User::create(
            [
                'email' => $request->email,
                'password' =>  $request->password,
                'first_name' => $request->first_name,
                'last_name' => $request->last_name,
                'username' => $username,
            ]
        );
        return $this->login($request);
    }

    /**
     * Get the authenticated User.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function me()
    {
        return response()->json(JWTAuth::user());
    }

    /**
     * Log the user out (Invalidate the token).
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout()
    {
        JWTAuth::logout();

        return response()->json(['message' => 'Successfully logged out']);
    }

    /**
     * Refresh a token.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function refresh()
    {
        return $this->respondWithToken(JWTAuth::refresh());
    }

    /**
     * Get the token array structure.
     *
     * @param  string $token
     *
     * @return \Illuminate\Http\JsonResponse
     */
    protected function respondWithToken($token)
    {
        $user = JWTAuth::user();
        $user->followers_count = $user->followers()->count();
        $user->followings_count = $user->followings()->count();
        $user->tweets_count = $user->tweets()->count();
        unset($user->facebook_access_token);
        unset($user->email_verified_at);
        unset($user->updated_at);
        unset($user->google_access_token);

        $ttl = JWTAuth::factory()->getTTL();
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => Carbon::now()->addMinutes($ttl),
            'user' => JWTAuth::user()
        ]);
    }
}
