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
            $table->string('first_name',20);
            $table->string('last_name',20);
            $table->string('username',20)->unique();
            $table->string('password');	
            $table->string('email');
            $table->text('profile_picture')->nullable();
            $table->text('cover_picture')->nullable();
            $table->text('bio')->nullable();
            $table->string('location')->nullable();
            $table->string('website')->nullable();
            $table->string('google_access_token')->nullable();
            $table->string('facebook_access_token')->nullable();
            $table->date('date_of_birth');
            $table->string('gender',1);	
            $table->string('phone_number');
            $table->timestamp('email_verified_at');
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
