<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('first_name',20)->nullable();
            $table->string('last_name',20)->nullable();
            $table->string('username',20)->nullable()->unique();
            $table->string('password')->nullable();	
            $table->string('email')->nullable();
            $table->text('profile_picture');
            $table->text('cover_picture');
            $table->text('bio');
            $table->string('location');
            $table->string('website');
            $table->string('google_access_token');
            $table->string('facebook_access_token');
            $table->date('date_of_birth');
            $table->boolean('gender');	
            $table->string('phone_number');
            $table->timestamp('email_verified_at')->nullable();
            $table->timestamps();
            $table->rememberToken();

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('users');
    }
};
