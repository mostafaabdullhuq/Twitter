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
        Schema::create('tweet_hashtags', function (Blueprint $table) {
            $table->id();

            $table->unsignedBigInteger('tweet_id');
            $table->foreign('tweet_id')->references('id')->on('tweets');

            $table->unsignedBigInteger('hashtag_id');
            $table->foreign('hashtag_id')->references('id')->on('hashtags');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('tweet_hashtags');
    }
};
