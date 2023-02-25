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
            'first_name' => ['required', 'string'],
            'last_name' => ['required', 'string'],
            'bio' => 'string',
            'website' => 'string',
            'date_of_birth' => 'date',
            'password' => 'required|min:8|confirmed|max:24',
            'password_confirmation' => 'required|same:password|max:24',

        ];
    }
}
