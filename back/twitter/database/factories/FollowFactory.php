<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class FollowFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            // 'following_id' => 51,
            'following_id' => $this->faker->numberBetween(1, 51),
            'follower_id' => $this->faker->numberBetween(1, 51),
        ];
    }
}
