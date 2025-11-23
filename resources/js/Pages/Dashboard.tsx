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
            className="!bg-[#f5f7fb]"
        >
            <Head title="Dashboard" />

            {/* ======== CONTENIDO PRINCIPAL ======== */}
            <div className="py-10">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">

                    {/* ======== TARJETAS DE ESTADÍSTICAS ======== */}
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-10">

                        {/* Card genérica */}
                        {[
                            { label: "Total Proyectos", value: stats.total_projects, color: "bg-blue-600" },
                            { label: "Total Tareas", value: stats.total_tasks, color: "bg-green-600" },
                            { label: "Tareas Pendientes", value: stats.pending_tasks, color: "bg-yellow-500" },
                            { label: "Tareas Completadas", value: stats.completed_tasks, color: "bg-emerald-600" }
                        ].map((item, idx) => (
                            <div key={idx}
                                className="bg-white shadow-md rounded-xl border border-gray-200 hover:shadow-lg transition p-5">
                                <div className="flex items-center">
                                    <div className={`w-10 h-10 ${item.color} rounded-md flex items-center justify-center shadow`}>
                                        <span className="text-white text-lg font-bold">✓</span>
                                    </div>
                                    <div className="ml-4">
                                        <p className="text-gray-500 text-sm font-medium">{item.label}</p>
                                        <p className="text-gray-900 text-xl font-semibold">{item.value}</p>
                                    </div>
                                </div>
                            </div>
                        ))}

                    </div>

                    {/* ======== SECCIÓN DOS COLUMNAS ======== */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

                        {/* === PROYECTOS RECIENTES === */}
                        <div className="bg-white border rounded-xl shadow-md p-6">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-semibold text-gray-900">Proyectos Recientes</h3>
                                <Link
                                    href={route('projects.index')}
                                    className="text-sm text-blue-600 hover:underline font-medium"
                                >
                                    Ver todos
                                </Link>
                            </div>

                            <div className="space-y-3">
                                {recentProjects.length > 0 ? (
                                    recentProjects.map((project) => (
                                        <div key={project.id}
                                            className="p-4 bg-[#f6f7f9] rounded-lg border hover:bg-[#eef0f4] transition flex justify-between items-center">
                                            <div>
                                                <Link
                                                    href={route('projects.show', project.id)}
                                                    className="text-sm font-semibold text-[#3b5998] hover:underline"
                                                >
                                                    {project.title}
                                                </Link>
                                                <p className="text-xs text-gray-500 mt-1">
                                                    {new Date(project.start_date).toLocaleDateString()} - {new Date(project.end_date).toLocaleDateString()}
                                                </p>
                                            </div>

                                            <span className={`px-2.5 py-1 rounded-full text-xs font-medium
                                                ${project.status === 'completed' ? 'bg-green-100 text-green-800' :
                                                    project.status === 'in_progress' ? 'bg-blue-100 text-blue-800' :
                                                        project.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                                                            'bg-gray-100 text-gray-800'}`}>
                                                {project.status === 'completed'
                                                    ? 'Completado'
                                                    : project.status === 'in_progress'
                                                        ? 'En Progreso'
                                                        : project.status === 'cancelled'
                                                            ? 'Cancelado'
                                                            : 'Pendiente'
                                                }
                                            </span>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-center text-gray-500 text-sm py-4">
                                        No hay proyectos recientes
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* === MIS TAREAS === */}
                        <div className="bg-white border rounded-xl shadow-md p-6">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-semibold text-gray-900">Mis Tareas</h3>
                                <Link
                                    href={route('tasks.index')}
                                    className="text-sm text-blue-600 hover:underline font-medium"
                                >
                                    Ver todas
                                </Link>
                            </div>

                            <div className="space-y-3">
                                {myTasks.length > 0 ? (
                                    myTasks.map((task) => (
                                        <div key={task.id}
                                            className="p-4 bg-[#f6f7f9] rounded-lg border hover:bg-[#eef0f4] transition flex justify-between items-center">
                                            <div>
                                                <Link
                                                    href={route('tasks.show', task.id)}
                                                    className="text-sm font-semibold text-[#3b5998] hover:underline"
                                                >
                                                    {task.title}
                                                </Link>
                                                <p className="text-xs text-gray-500 mt-1">
                                                    {task.project?.title} • Vence: {new Date(task.end_date).toLocaleDateString()}
                                                </p>
                                            </div>

                                            <span className={`px-2.5 py-1 rounded-full text-xs font-medium
                                                ${task.status === 'completed' ? 'bg-green-100 text-green-800' :
                                                    task.status === 'in_progress' ? 'bg-blue-100 text-blue-800' :
                                                        'bg-gray-100 text-gray-800'}`}>
                                                {task.status === 'completed'
                                                    ? 'Completada'
                                                    : task.status === 'in_progress'
                                                        ? 'En Progreso'
                                                        : 'Pendiente'
                                                }
                                            </span>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-center text-gray-500 text-sm py-4">
                                        No tienes tareas asignadas
                                    </p>
                                )}
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
