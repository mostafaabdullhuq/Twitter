<?php

namespace App\Http\Controllers;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\UpdateUserData;
use Symfony\Component\HttpFoundation\Response;

class UpdateDataController extends Controller
{
    public function update(UpdateUserData $request){
        return $this->getUserRow($request)->count() > 0 ? $this->updateData($request) : $this->emailNotFoundResponse();
    }
    
        private function getUserRow($request)
    {
        return DB::table('users')->where('email', $request->email);
                                
    }

    private function emailNotFoundResponse()
    {
        return response()->json(['error' => 'Email is incorrect'],Response::HTTP_UNPROCESSABLE_ENTITY);
    }

    private function updateData($request)
    {
        $user = User::whereEmail($request->email)->first();

        // Save the old values in variables
        $oldEmail = $user->email;
        $oldFirstName = $user->first_name;
        $oldLastName = $user->last_name;
        $oldUserName = $user->username;
        $oldBio = $user->bio;
        $oldLocation = $user->location;
        $oldWebsite = $user->website;
        $oldPhoneNumber = $user->phone_number;
        $oldDateOfBirth = $user->date_of_birth;

        // Update the user data if the request data is not empty
        if (!empty($request->email)) {
            $user->email = $request->email;
        }
        if (!empty($request->first_name)) {
            $user->first_name = $request->first_name;
        }
        if (!empty($request->last_name)) {
            $user->last_name = $request->last_name;
        }
        if (!empty($request->username)) {
            $user->username = $request->username;
        }
        if (!empty($request->bio)) {
            $user->bio = $request->bio;
        }
        if (!empty($request->location)) {
            $user->location = $request->location;
        }
        if (!empty($request->website)) {
            $user->website = $request->website;
        }
        if (!empty($request->phone_number)) {
            $user->phone_number = $request->phone_number;
        }
        if (!empty($request->date_of_birth)) {
            $user->date_of_birth = $request->date_of_birth;
        }

        // Save the changes to the database
        $user->save();

        // Check if any data was updated and return a success message
        if ($user->email != $oldEmail || $user->first_name != $oldFirstName || $user->last_name != $oldLastName || $user->username != $oldUserName || $user->bio != $oldBio ||
            $user->location != $oldLocation || $user->website != $oldWebsite || $user->phone_number != $oldPhoneNumber ||
            $user->date_of_birth != $oldDateOfBirth) {
            return response()->json(['data' => 'Data Successfully Changed'], Response::HTTP_CREATED);
        } else {
            return response()->json(['data' => 'No Data Changed'], Response::HTTP_OK);
        }
    }
}
