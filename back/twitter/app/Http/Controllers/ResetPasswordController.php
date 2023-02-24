<?php

namespace App\Http\Controllers;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Mail;
use App\Mail\ResetPasswordMail;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class ResetPasswordController extends Controller
{
  // check if the email is valid
  public function sendEmail(Request $request)
  {
      if (!$this->validateEmail($request->email)) {
          return $this->failedResponse();
      }
      $this->send($request->email);
      return $this->successResponse();
  }

// send reset password mail to mailtrap with token
  public function send($email){
   $token = $this->createToken($email);
    Mail::to($email)->send(new ResetPasswordMail($token));
  }

// generate  a token and save it in password_resets table
  public function createToken($email)
  {
      $oldToken = DB::table('password_resets')->where('email', $email)->first();

      if ($oldToken) {
          return $oldToken->token;
      }

      $token = Str::random(60);
      $this->saveToken($token, $email);
      return $token;
  }
// save data to database
  public function saveToken($token,$email){
    DB::table('password_resets')->insert([
      'email' => $email,
      'token' => $token,
      'created_at' => Carbon::now(),
    ]);
  }
// check if the email is valid and exists in the database
  public function validateEmail($email)
  {
      return !!User::where('email', $email)->first();
  }

    public function failedResponse()
    {
        return response()->json([
            'error' => 'Invalid email address'
        ], Response::HTTP_NOT_FOUND);
    }

    public function successResponse()
    {
        return response()->json([
            'data' => 'Reset Email sent successfully, please check your email'
        ], Response::HTTP_OK);
    }
}


// ---------------- Note --------------------------------
  // ------used mailtrap to send reset password email-------
  //  in .env file:
//   MAIL_MAILER=smtp
// MAIL_HOST=sandbox.smtp.mailtrap.io
// MAIL_PORT=587
// MAIL_USERNAME= your mailer username
// MAIL_PASSWORD= your mailer password
// MAIL_ENCRYPTION=
// MAIL_FROM_ADDRESS="cb5f05002c-dfc03e@inbox.mailtrap.io"
// MAIL_FROM_NAME="App Name"

  // website for maitrap (https://mailtrap.io)
  // make sure that you sign in in maitrap then go to inbox 
  // for getting your username and password