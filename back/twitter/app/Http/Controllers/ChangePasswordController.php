<?php

namespace App\Http\Controllers;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use App\Http\Requests\changePasswordRequest;
use Symfony\Component\HttpFoundation\Response;

class ChangePasswordController extends Controller
{
    public function process(changePasswordRequest $request){
        return $this->getPasswordResetTableRow($request)->count()> 0 ? $this->changePassword($request) : $this->tokenNotFoundResponse();
    }
// get user fom database by email
    private function getPasswordResetTableRow($request){
        return DB::table('password_resets')->where(['email' => $request->email]);
    }
    private function tokenNotFoundResponse()
    {
        return response()->json(['error' => 'Email is incorrect'],Response::HTTP_UNPROCESSABLE_ENTITY);
    }
// update password in users table database 
    private function changePassword($request)
    {
        $user = User::whereEmail($request->email)->first();
        $user->update(['password'=>$request->password]);
        $this->getPasswordResetTableRow($request)->delete();
        return response()->json(['data'=>'Password Successfully Changed'],Response::HTTP_CREATED);
    }
}
