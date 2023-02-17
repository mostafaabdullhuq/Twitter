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
        Schema::create('categories_tweets', function (Blueprint $table) {
            $table->id();

            $table->unsignedBigInteger('topic_id');
            $table->foreign('topic_id')->references('id')->on('trending_topics');

            $table->unsignedBigInteger('tweet_id');
            $table->foreign('tweet_id')->references('id')->on('tweets');

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
        Schema::dropIfExists('categories_tweets');
    }
};
