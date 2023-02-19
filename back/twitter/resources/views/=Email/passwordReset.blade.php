<x-mail::message>
# Change Password request

Click on the button below to change your password.

<x-mail::button :url="'http://127.0.0.1:4200/request-password-reset?token'".$token>
Reset Password
</x-mail::button>

Thanks,<br>
{{ config('app.name') }}
</x-mail::message>
