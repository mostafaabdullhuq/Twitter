<?php

namespace App\Http\Requests\Api;

use Illuminate\Foundation\Http\FormRequest;

class CreateTweetRequest extends FormRequest
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
            'text' => 'string|max:500|required_without:files',
            'schedule_date_time' => 'date',
            'files' => 'array|max:4|required_without:text',
            'files.*' => 'file|mimes:jpg,jpeg,png,gif,mp4,webm,ogg,m4v,avi,flv,mov|max:50000|required_without:text',
        ];
    }

    /**
     * Get the error messages for the defined validation rules.
     *
     * @return array<string, mixed>
     */
    public function messages()
    {
        return [
            'text.required_without_all' => 'The text field is required when no media is provided.',
            'media_1.required_with' => 'The media 1 field is required when media 2, 3 or 4 is provided.',
            'media_2.required_with' => 'The media 2 field is required when media 3 or 4 is provided.',
            'media_3.required_with' => 'The media 3 field is required when media 4 is provided.',
        ];
    }
}