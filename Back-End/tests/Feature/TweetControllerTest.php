<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\Concerns\InteractsWithDatabase;
use App\Models\Reply;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\User;
use App\Models\Tweet;
use App\Http\Controllers\Api\TweetController;


class TweetControllerTest extends TestCase
{
    use InteractsWithDatabase;
    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function test_example()
    {
        $response = $this->get('/');

        $response->assertStatus(200);
    }
    public function testCreateTweet()
    {
        // Create a new user for the test
        $user = User::factory()->create();

        // Log the user in
        $this->actingAs($user);
        // Make a request to create a new tweet

        //create
        $response = $this->post('http://127.0.0.1:8000/api/tweet', [
            'text' => 'Test tweet',
        ]);

        // Assert that the tweet was created successfully
        $response->assertStatus(201);

        // Create a tweet to reply to
        $response = $this->post('http://127.0.0.1:8000/api/tweet', [
            'text' => 'Test tweet',
        ]);

        // Get the ID of the created tweet
        $tweetId = $response->json('id');

        // Reply to the tweet
//         $response = $this->post("http://127.0.0.1:8000/api/tweet/{$tweetId}/reply", [
//             'text' => 'Test reply',
//         ]);

// //
//         $response = $this->post("http://127.0.0.1:8000/api/tweet/{$tweetId}/retweet", [
//             'text' => 'Test retweet',
//         ]);

        // Assert that the reply was created successfully
        $response->assertStatus(201);


        // Assert that the tweet is in the database
        $this->assertDatabaseHas('tweets', [
            // 'text' => 'Test tweet',

        ]);
    }


    public function testReply()
{

    // Create a tweet to reply to
    $tweet = Reply::factory(Tweet::class)->create();
    $user = User::factory()->create();

    // Log the user in
    $this->actingAs($user);
    // Post a reply to the tweet
    $response = $this->post("http://127.0.0.1:8000/api/tweet/{$tweet->id}/reply", [
        'text' => 'Test reply',
    ]);
    var_dump($tweet->replies()->get());
    // Assert that the reply was created successfully
    $response->assertStatus(201);

    // Assert that the tweet has one reply
    $this->assertEquals(1, $tweet->replies);
}


public function testHomeForYou()
{
    // Create a new user for the test
    $user = User::factory()->create();

    // Log the user in
    $this->actingAs($user);

    // Create some tweets for the user's homeforyou timeline
    Tweet::factory()->count(10)->create(['user_id' => $user->id]);

    // Make a GET request to the homeforyou endpoint
    $response = $this->get('http://127.0.0.1/api/tweet/foryou');

    // Assert that the response has a 200 status code
    $response->assertStatus(200);

    // Assert that the response has the correct structure
    $response->assertJsonStructure([
        'tweets',
        'nextCursor',
    ]);

    // Assert that the response has the expected number of tweets
    $response->assertJsonCount(9, 'tweets');

    // Assert that the nextCursor value is present in the response
    $response->assertJsonFragment([
        'nextCursor' => $response->json('nextCursor'),
    ]);
}
}
