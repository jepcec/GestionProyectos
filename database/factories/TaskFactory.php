<?php

namespace Database\Factories;

use App\Models\Task;
use Illuminate\Database\Eloquent\Factories\Factory;

/** @extends Factory<Task> */
class TaskFactory extends Factory
{
    protected $model = Task::class;

    public function definition(): array
    {
        $start = $this->faker->dateTimeBetween('-1 month', '+2 weeks');
        $end = (clone $start)->modify('+'.mt_rand(3, 30).' days');

        $statuses = [
            Task::STATUS_PENDING,
            Task::STATUS_IN_PROGRESS,
            Task::STATUS_COMPLETED,
        ];

        return [
            'title' => ucfirst($this->faker->words(4, true)),
            'description' => $this->faker->paragraphs(2, true),
            'start_date' => $start->format('Y-m-d'),
            'end_date' => $end->format('Y-m-d'),
            'status' => $this->faker->randomElement($statuses),
            // project_id, assigned_user_id, created_by se setean en el seeder
        ];
    }
}
