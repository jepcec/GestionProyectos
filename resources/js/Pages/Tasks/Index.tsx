import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import { PageProps, Task, PaginatedData } from '@/types';

interface TasksIndexProps extends PageProps {
    tasks: PaginatedData<Task>;
}

export default function TasksIndex({ tasks }: TasksIndexProps) {
    const handleStatusUpdate = (taskId: number, status: string) => {
        router.patch(route('tasks.update-status', taskId), { status }, {
            preserveScroll: true,
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        Tareas
                    </h2>
                    <Link
                        href={route('tasks.create')}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Nueva Tarea
                    </Link>
                </div>
            }
        >
            <Head title="Tareas" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            {tasks.data.length > 0 ? (
                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Tarea
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Proyecto
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Asignado a
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Fechas
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Estado
                                                </th>
                                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Acciones
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {tasks.data.map((task) => (
                                                <tr key={task.id} className="hover:bg-gray-50">
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div>
                                                            <Link
                                                                href={route('tasks.show', task.id)}
                                                                className="text-sm font-medium text-blue-600 hover:text-blue-500"
                                                            >
                                                                {task.title}
                                                            </Link>
                                                            <p className="text-sm text-gray-500 mt-1">
                                                                {task.description.length > 80
                                                                    ? `${task.description.substring(0, 80)}...`
                                                                    : task.description}
                                                            </p>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                        <Link
                                                            href={route('projects.show', task.project?.id)}
                                                            className="text-blue-600 hover:text-blue-500"
                                                        >
                                                            {task.project?.title}
                                                        </Link>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                        <div className="flex items-center">
                                                            <div className="inline-flex items-center justify-center w-8 h-8 bg-gray-500 rounded-full text-white text-xs font-medium mr-3">
                                                                {task.assigned_user?.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                                                            </div>
                                                            {task.assigned_user?.name}
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                        <div>
                                                            <p>Inicio: {new Date(task.start_date).toLocaleDateString()}</p>
                                                            <p>Fin: {new Date(task.end_date).toLocaleDateString()}</p>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <select
                                                            value={task.status}
                                                            onChange={(e) => handleStatusUpdate(task.id, e.target.value)}
                                                            className={`text-xs font-medium rounded-full px-2.5 py-0.5 border-0 ${
                                                                task.status === 'completed' ? 'bg-green-100 text-green-800' :
                                                                task.status === 'in_progress' ? 'bg-blue-100 text-blue-800' :
                                                                'bg-gray-100 text-gray-800'
                                                            }`}
                                                        >
                                                            <option value="pending">Pendiente</option>
                                                            <option value="in_progress">En Progreso</option>
                                                            <option value="completed">Completada</option>
                                                        </select>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                        <div className="flex justify-end space-x-2">
                                                            <Link
                                                                href={route('tasks.show', task.id)}
                                                                className="text-blue-600 hover:text-blue-900"
                                                            >
                                                                Ver
                                                            </Link>
                                                            <Link
                                                                href={route('tasks.edit', task.id)}
                                                                className="text-indigo-600 hover:text-indigo-900"
                                                            >
                                                                Editar
                                                            </Link>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            ) : (
                                <div className="text-center py-12">
                                    <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                    </svg>
                                    <h3 className="mt-2 text-sm font-medium text-gray-900">No hay tareas</h3>
                                    <p className="mt-1 text-sm text-gray-500">Comienza creando una nueva tarea.</p>
                                    <div className="mt-6">
                                        <Link
                                            href={route('tasks.create')}
                                            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                                        >
                                            Crear Tarea
                                        </Link>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
