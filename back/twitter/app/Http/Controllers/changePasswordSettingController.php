<?php

namespace App\Http\Controllers;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use App\Http\Requests\changePasswordSettingRequest;
use Symfony\Component\HttpFoundation\Response;

class changePasswordSettingController extends Controller
{
    public function passwordSetting(changePasswordSettingRequest $request){
        return $this->getPasswordResetTableRow($request)->count()> 0 ? $this->changePassword($request) : $this->emailNotFoundResponse();
    }
// get user fom database by email
    private function getPasswordResetTableRow($request){
        return DB::table('users')->where(['email' => $request->email]);
    }
    private function emailNotFoundResponse()
    {
        return response()->json(['error' => 'Email is incorrect'],Response::HTTP_UNPROCESSABLE_ENTITY);
    }
// update password in users table database 
    private function changePassword($request)
    {
        $user = User::whereEmail($request->email)->first();
        $oldEmail = $user->email;
        if ($request->email !== null) {
            $user->email = $request->email;
        }
        if ($request->password !== null) {
            $user->password = $request->password;
        }
        $user->save();   
        if ($user->email !== $oldEmail){  
        return response()->json(['data'=>'done'],Response::HTTP_CREATED);        
    } else{
        return response()->json(['data' => 'Password Successfully Changed'], Response::HTTP_OK);

    }   }
}

