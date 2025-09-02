import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { PageProps, DashboardStats, Project, Task } from '@/types';

interface DashboardProps extends PageProps {
    stats: DashboardStats;
    recentProjects: Project[];
    myTasks: Task[];
    tasksByProject: Project[];
}

export default function Dashboard({ stats, recentProjects, myTasks, tasksByProject }: DashboardProps) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
                        <div className="bg-white overflow-hidden shadow rounded-lg">
                            <div className="p-5">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0">
                                        <div className="w-8 h-8 bg-blue-500 rounded-md flex items-center justify-center">
                                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                            </svg>
                                        </div>
                                    </div>
                                    <div className="ml-5 w-0 flex-1">
                                        <dl>
                                            <dt className="text-sm font-medium text-gray-500 truncate">Total Proyectos</dt>
                                            <dd className="text-lg font-medium text-gray-900">{stats.total_projects}</dd>
                                        </dl>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white overflow-hidden shadow rounded-lg">
                            <div className="p-5">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0">
                                        <div className="w-8 h-8 bg-green-500 rounded-md flex items-center justify-center">
                                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                            </svg>
                                        </div>
                                    </div>
                                    <div className="ml-5 w-0 flex-1">
                                        <dl>
                                            <dt className="text-sm font-medium text-gray-500 truncate">Total Tareas</dt>
                                            <dd className="text-lg font-medium text-gray-900">{stats.total_tasks}</dd>
                                        </dl>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white overflow-hidden shadow rounded-lg">
                            <div className="p-5">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0">
                                        <div className="w-8 h-8 bg-yellow-500 rounded-md flex items-center justify-center">
                                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        </div>
                                    </div>
                                    <div className="ml-5 w-0 flex-1">
                                        <dl>
                                            <dt className="text-sm font-medium text-gray-500 truncate">Tareas Pendientes</dt>
                                            <dd className="text-lg font-medium text-gray-900">{stats.pending_tasks}</dd>
                                        </dl>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white overflow-hidden shadow rounded-lg">
                            <div className="p-5">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0">
                                        <div className="w-8 h-8 bg-emerald-500 rounded-md flex items-center justify-center">
                                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                    </div>
                                    <div className="ml-5 w-0 flex-1">
                                        <dl>
                                            <dt className="text-sm font-medium text-gray-500 truncate">Tareas Completadas</dt>
                                            <dd className="text-lg font-medium text-gray-900">{stats.completed_tasks}</dd>
                                        </dl>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Recent Projects */}
                        <div className="bg-white overflow-hidden shadow rounded-lg">
                            <div className="px-4 py-5 sm:p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-lg leading-6 font-medium text-gray-900">Proyectos Recientes</h3>
                                    <Link
                                        href={route('projects.index')}
                                        className="text-sm text-blue-600 hover:text-blue-500"
                                    >
                                        Ver todos
                                    </Link>
                                </div>
                                <div className="space-y-3">
                                    {recentProjects.length > 0 ? (
                                        recentProjects.map((project) => (
                                            <div key={project.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                                <div>
                                                    <Link
                                                        href={route('projects.show', project.id)}
                                                        className="text-sm font-medium text-gray-900 hover:text-blue-600"
                                                    >
                                                        {project.title}
                                                    </Link>
                                                    <p className="text-xs text-gray-500 mt-1">
                                                        {new Date(project.start_date).toLocaleDateString()} - {new Date(project.end_date).toLocaleDateString()}
                                                    </p>
                                                </div>
                                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                                    project.status === 'completed' ? 'bg-green-100 text-green-800' :
                                                    project.status === 'in_progress' ? 'bg-blue-100 text-blue-800' :
                                                    project.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                                                    'bg-gray-100 text-gray-800'
                                                }`}>
                                                    {project.status === 'completed' ? 'Completado' :
                                                     project.status === 'in_progress' ? 'En Progreso' :
                                                     project.status === 'cancelled' ? 'Cancelado' : 'Pendiente'}
                                                </span>
                                            </div>
                                        ))
                                    ) : (
                                        <p className="text-sm text-gray-500 text-center py-4">No hay proyectos recientes</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* My Tasks */}
                        <div className="bg-white overflow-hidden shadow rounded-lg">
                            <div className="px-4 py-5 sm:p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-lg leading-6 font-medium text-gray-900">Mis Tareas</h3>
                                    <Link
                                        href={route('tasks.index')}
                                        className="text-sm text-blue-600 hover:text-blue-500"
                                    >
                                        Ver todas
                                    </Link>
                                </div>
                                <div className="space-y-3">
                                    {myTasks.length > 0 ? (
                                        myTasks.map((task) => (
                                            <div key={task.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                                <div>
                                                    <Link
                                                        href={route('tasks.show', task.id)}
                                                        className="text-sm font-medium text-gray-900 hover:text-blue-600"
                                                    >
                                                        {task.title}
                                                    </Link>
                                                    <p className="text-xs text-gray-500 mt-1">
                                                        {task.project?.title} • Vence: {new Date(task.end_date).toLocaleDateString()}
                                                    </p>
                                                </div>
                                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                                    task.status === 'completed' ? 'bg-green-100 text-green-800' :
                                                    task.status === 'in_progress' ? 'bg-blue-100 text-blue-800' :
                                                    'bg-gray-100 text-gray-800'
                                                }`}>
                                                    {task.status === 'completed' ? 'Completada' :
                                                     task.status === 'in_progress' ? 'En Progreso' : 'Pendiente'}
                                                </span>
                                            </div>
                                        ))
                                    ) : (
                                        <p className="text-sm text-gray-500 text-center py-4">No tienes tareas asignadas</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
