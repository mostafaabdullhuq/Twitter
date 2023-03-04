<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Reply>
 */
class ReplyFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'text' => $this->faker->sentence,
            'repliable_type' =>  'App\Models\Tweet',
            'repliable_id' => $this->faker->numberBetween(1, 1000),
            'user_id' => $this->faker->numberBetween(1, 50),
        ];
    }
}
