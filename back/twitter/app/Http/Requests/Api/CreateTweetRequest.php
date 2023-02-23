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
            'text' => 'string|max:500|required_without:media',
            'schedule_date_time' => 'date',
            'media' => "file|mimes:jpg,jpeg,png,gif,mp4,webm,ogg,m4v,avi,flv,mov|max:50000|required_without:text",
            // 'media' => "file|mimes:jpg,jpeg,png,gif,mp4,webm,ogg,video/quicktime,video/avi,video/mpeg|max:50000|required_without:text",
        ];
    }
}
