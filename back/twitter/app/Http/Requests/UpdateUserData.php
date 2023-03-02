<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateUserData extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'first_name' => 'required|string|max:30|min:3',
            'last_name' => 'required|string|max:30|min:3',
            'username' => 'required|string|max:20|min:3|unique:users,username,' . auth()->id(),
            'profile_picture' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:10000',
            'cover_picture' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:10000',
            'bio' => 'nullable|string|max:255',
            'location' => 'nullable|string|max:255',
            'website' => 'nullable|string|max:255',
            'phone_number' => 'nullable|string|max:20|regex:/^([0-9\s\-\+\(\)]*)$/|min:10',
            'date_of_birth' => 'nullable|date_format:Y-m-d|before:today|after:1900-01-01',
        ];
    }
    public function messages()
    {
        return [
            'first_name.required' => 'First name is required',
            'email.required' => 'Email is required',
            'email.unique' => 'Email is already taken',
            'phone_number.regex' => 'Phone number is invalid',
            'date_of_birth.before' => 'Date of birth must be before today',
            'date_of_birth.after' => 'Date of birth must be after 1900-01-01',

        ];
    }
}
