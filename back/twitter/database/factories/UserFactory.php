<?php

namespace Database\Factories;

use Hash;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
 */
class UserFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            // 'first_name' => $this->faker->firstName(),
            // 'last_name' =>  $this->faker->lastName(),
            // 'username' => substr($this->faker->unique()->userName(), 0, 16),
            // 'email' => $this->faker->unique()->safeEmail(),
            // 'email_verified_at' => now(),
            // 'date_of_birth' => $this->faker->date(),
            // 'password' => Hash::make($this->faker->password(8, 20)), // password
            // 'remember_token' => Str::random(10),
            // 'gender' => true,
            // 'remember_token' => Str::random(10),
            // 'phone_number' =>  $this->faker->phoneNumber(),
            // 'website' => $this->faker->domainName(),
            // 'bio' => $this->faker->sentence(),
            // 'location' => $this->faker->city(),
            'first_name' => substr(preg_replace('/[^A-Za-z0-9\-]/', '', fake()->name()), 0, 6),
            'last_name' =>  substr(preg_replace('/[^A-Za-z0-9\-]/', '', fake()->name()), 0, 6),
            'username' => 'user_' . Str::random(9),
            'email' => fake()->unique()->safeEmail(),
            'email_verified_at' => now(),
            'date_of_birth' => now(),
            'password' => '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password
            'remember_token' => Str::random(10),
            'gender' => true,
            'remember_token' => Str::random(10),
            'phone_number' =>  Str::random(10),
        ];
    }

    /**
     * Indicate that the model's email address should be unverified.
     *
     * @return static
     */
    public function unverified()
    {
        return $this->state(fn (array $attributes) => [
            'email_verified_at' => null,
        ]);
    }
}