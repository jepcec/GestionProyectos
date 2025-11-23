<?php

namespace Database\Factories;

use App\Models\Project;
use Illuminate\Database\Eloquent\Factories\Factory;

/** @extends Factory<Project> */
class ProjectFactory extends Factory
{
    protected $model = Project::class;

    public function definition(): array
    {
        $start = $this->faker->dateTimeBetween('-2 months', '+1 week');
        $end = (clone $start)->modify('+'.mt_rand(10, 60).' days');

        $statuses = [
            Project::STATUS_PENDING,
            Project::STATUS_IN_PROGRESS,
            Project::STATUS_COMPLETED,
            Project::STATUS_CANCELLED,
        ];

        return [
            'title' => ucfirst($this->faker->words(3, true)),
            'description' => $this->faker->paragraphs(2, true),
            'start_date' => $start->format('Y-m-d'),
            'end_date' => $end->format('Y-m-d'),
            'status' => $this->faker->randomElement($statuses),
            // created_by se asigna en el seeder con ->for(User::class, 'creator') o manualmente
        ];
    }
}
