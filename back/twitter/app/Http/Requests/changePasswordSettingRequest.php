<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class changePasswordSettingRequest extends FormRequest
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
            // 'password' => 'min:8|confirmed|max:24',
            // 'password_confirmation' => 'same:password|max:24',
        ];
    }
}
