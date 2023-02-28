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

    public function __construct()
    {
        $this->middleware('auth:api');
    }


    public function update(UpdateUserData $request)
    {
        return $this->getUserRow($request)->count() > 0 ? $this->updateData($request) : $this->emailNotFoundResponse();
    }

    private function getUserRow($request)
    {
        return DB::table('users')->where('email', $request->email);
    }

    private function emailNotFoundResponse()
    {
        return response()->json(['error' => 'Email is incorrect'], Response::HTTP_UNPROCESSABLE_ENTITY);
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
        $oldprofile_picture = $user->profile_picture;
        $oldcover_picture  = $user->cover_picture;

        // Update the user data if the request data is not null
        if ($request->email !== null) {
            $user->email = $request->email;
        }
        if ($request->first_name !== null) {
            $user->first_name = $request->first_name;
        }
        if ($request->last_name !== null) {
            $user->last_name = $request->last_name;
        }
        if (!$request->username || trim($request->username) == '') {
            $user->username = null;
        } else {
            $user->username = $request->username;
        }
        if (!$request->bio || trim($request->bio) == '') {
            $user->bio = null;
        } else {
            $user->bio = $request->bio;
        }
        if (!$request->location || trim($request->location) == '') {
            $user->location = null;
        } else {
            $user->location = $request->location;
        }

        if (!$request->website || trim($request->website) == '') {
            $user->website = null;
        } else {
            $user->website = $request->website;
        }
        if (!$request->phone_number || trim($request->phone_number) == '') {
            $user->phone_number = null;
        } else {
            $user->phone_number = $request->phone_number;
        }
        if (!$request->date_of_birth || trim($request->date_of_birth) == '') {
            $user->date_of_birth = null;
        } else {
            $user->date_of_birth = $request->date_of_birth;
        }
        if (!$request->profile_picture || trim($request->profile_picture) == '') {
            $user->profile_picture = null;
        } else {
            $user->profile_picture = $request->profile_picture;
        }
        if (!$request->cover_picture  || trim($request->cover_picture) == '') {
            $user->cover_picture  = null;
        } else {
            $user->cover_picture  = $request->cover_picture;
        }

        // Save the changes to the database
        $user->save();

        // Check if any data was updated and return a success message
        if (
            $user->email !== $oldEmail || $user->first_name !== $oldFirstName || $user->last_name !== $oldLastName || $user->username !== $oldUserName || $user->bio !== $oldBio ||
            $user->location !== $oldLocation || $user->website !== $oldWebsite || $user->phone_number !== $oldPhoneNumber ||
            $user->date_of_birth !== $oldDateOfBirth || $user->profile_picture !== $oldprofile_picture || $user->cover_picture !== $oldcover_picture
        ) {
            return response()->json(['data' => 'Data Successfully Changed'], Response::HTTP_CREATED);
        } else {
            return response()->json(['data' => 'No Data Changed'], Response::HTTP_OK);
        }
    }
}
