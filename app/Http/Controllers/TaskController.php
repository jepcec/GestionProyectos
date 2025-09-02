<?php

namespace App\Http\Controllers;

use App\Models\Task;
use App\Models\Project;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TaskController extends Controller
{
    public function index()
    {
        $user = auth()->user();
        
        $query = Task::with(['project', 'assignedUser', 'creator']);

        // Non-admin users only see their assigned tasks or tasks from their projects
        if (!$user->hasRole('Administrador')) {
            $query->where(function ($q) use ($user) {
                $q->where('assigned_user_id', $user->id)
                  ->orWhereHas('project.users', function ($subQ) use ($user) {
                      $subQ->where('user_id', $user->id);
                  });
            });
        }

        $tasks = $query->paginate(10);
        
        return Inertia::render('Tasks/Index', [
            'tasks' => $tasks,
        ]);
    }

    public function create()
    {
        $user = auth()->user();
        
        $projectsQuery = Project::query();
        
        // Non-admin users can only create tasks for their assigned projects
        if (!$user->hasRole('Administrador')) {
            $projectsQuery->whereHas('users', function ($q) use ($user) {
                $q->where('user_id', $user->id);
            });
        }
        
        $projects = $projectsQuery->get();
        $users = User::where('is_enabled', true)->get();
        
        return Inertia::render('Tasks/Create', [
            'projects' => $projects,
            'users' => $users,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after:start_date',
            'project_id' => 'required|exists:projects,id',
            'assigned_user_id' => 'required|exists:users,id',
        ]);

        $project = Project::findOrFail($validated['project_id']);
        
        // Check if user can create tasks for this project
        if (!auth()->user()->hasRole('Administrador') && 
            !$project->users->contains(auth()->id())) {
            abort(403, 'No tienes permisos para crear tareas en este proyecto.');
        }

        Task::create([
            'title' => $validated['title'],
            'description' => $validated['description'],
            'start_date' => $validated['start_date'],
            'end_date' => $validated['end_date'],
            'project_id' => $validated['project_id'],
            'assigned_user_id' => $validated['assigned_user_id'],
            'created_by' => auth()->id(),
        ]);

        return redirect()->route('tasks.index')
            ->with('success', 'Tarea creada exitosamente.');
    }

    public function show(Task $task)
    {
        $this->authorize('view', $task);
        
        $task->load([
            'project',
            'assignedUser',
            'creator',
            'files.uploader'
        ]);
        
        return Inertia::render('Tasks/Show', [
            'task' => $task,
        ]);
    }

    public function edit(Task $task)
    {
        $this->authorize('update', $task);
        
        $user = auth()->user();
        
        $projectsQuery = Project::query();
        
        // Non-admin users can only see their assigned projects
        if (!$user->hasRole('Administrador')) {
            $projectsQuery->whereHas('users', function ($q) use ($user) {
                $q->where('user_id', $user->id);
            });
        }
        
        $projects = $projectsQuery->get();
        $users = User::where('is_enabled', true)->get();
        
        return Inertia::render('Tasks/Edit', [
            'task' => $task,
            'projects' => $projects,
            'users' => $users,
        ]);
    }

    public function update(Request $request, Task $task)
    {
        $this->authorize('update', $task);
        
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after:start_date',
            'status' => 'required|in:pending,in_progress,completed',
            'project_id' => 'required|exists:projects,id',
            'assigned_user_id' => 'required|exists:users,id',
        ]);

        $task->update($validated);

        return redirect()->route('tasks.index')
            ->with('success', 'Tarea actualizada exitosamente.');
    }

    public function destroy(Task $task)
    {
        $this->authorize('delete', $task);
        
        $task->delete();

        return redirect()->route('tasks.index')
            ->with('success', 'Tarea eliminada exitosamente.');
    }

    public function updateStatus(Request $request, Task $task)
    {
        $this->authorize('updateStatus', $task);
        
        $validated = $request->validate([
            'status' => 'required|in:pending,in_progress,completed',
        ]);

        $task->update(['status' => $validated['status']]);

        return back()->with('success', 'Estado de la tarea actualizado.');
    }
}
