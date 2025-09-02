import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { PageProps, Project, PaginatedData } from '@/types';

interface ProjectsIndexProps extends PageProps {
    projects: PaginatedData<Project>;
}

export default function ProjectsIndex({ projects }: ProjectsIndexProps) {
    return (
        <AuthenticatedLayout
            header={
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        Proyectos
                    </h2>
                    <Link
                        href={route('projects.create')}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Nuevo Proyecto
                    </Link>
                </div>
            }
        >
            <Head title="Proyectos" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            {projects.data.length > 0 ? (
                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Proyecto
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Fechas
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Estado
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Tareas
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Responsables
                                                </th>
                                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Acciones
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {projects.data.map((project) => (
                                                <tr key={project.id} className="hover:bg-gray-50">
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div>
                                                            <Link
                                                                href={route('projects.show', project.id)}
                                                                className="text-sm font-medium text-blue-600 hover:text-blue-500"
                                                            >
                                                                {project.title}
                                                            </Link>
                                                            <p className="text-sm text-gray-500 mt-1">
                                                                {project.description.length > 100
                                                                    ? `${project.description.substring(0, 100)}...`
                                                                    : project.description}
                                                            </p>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                        <div>
                                                            <p>Inicio: {new Date(project.start_date).toLocaleDateString()}</p>
                                                            <p>Fin: {new Date(project.end_date).toLocaleDateString()}</p>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
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
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                        {project.tasks_count || 0} tareas
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                        <div className="flex -space-x-2">
                                                            {project.users?.slice(0, 3).map((user) => (
                                                                <div
                                                                    key={user.id}
                                                                    className="inline-flex items-center justify-center w-8 h-8 bg-gray-500 rounded-full text-white text-xs font-medium"
                                                                    title={user.name}
                                                                >
                                                                    {user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                                                                </div>
                                                            ))}
                                                            {(project.users?.length || 0) > 3 && (
                                                                <div className="inline-flex items-center justify-center w-8 h-8 bg-gray-300 rounded-full text-gray-600 text-xs font-medium">
                                                                    +{(project.users?.length || 0) - 3}
                                                                </div>
                                                            )}
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                        <div className="flex justify-end space-x-2">
                                                            <Link
                                                                href={route('projects.show', project.id)}
                                                                className="text-blue-600 hover:text-blue-900"
                                                            >
                                                                Ver
                                                            </Link>
                                                            <Link
                                                                href={route('projects.edit', project.id)}
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
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                    </svg>
                                    <h3 className="mt-2 text-sm font-medium text-gray-900">No hay proyectos</h3>
                                    <p className="mt-1 text-sm text-gray-500">Comienza creando un nuevo proyecto.</p>
                                    <div className="mt-6">
                                        <Link
                                            href={route('projects.create')}
                                            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                                        >
                                            Crear Proyecto
                                        </Link>
                                    </div>
                                </div>
                            )}

                            {/* Pagination */}
                            {projects.data.length > 0 && projects.last_page > 1 && (
                                <div className="mt-6 flex items-center justify-between">
                                    <div className="flex-1 flex justify-between sm:hidden">
                                        {projects.prev_page_url && (
                                            <Link
                                                href={projects.prev_page_url}
                                                className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                                            >
                                                Anterior
                                            </Link>
                                        )}
                                        {projects.next_page_url && (
                                            <Link
                                                href={projects.next_page_url}
                                                className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                                            >
                                                Siguiente
                                            </Link>
                                        )}
                                    </div>
                                    <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                                        <div>
                                            <p className="text-sm text-gray-700">
                                                Mostrando <span className="font-medium">{projects.from}</span> a{' '}
                                                <span className="font-medium">{projects.to}</span> de{' '}
                                                <span className="font-medium">{projects.total}</span> resultados
                                            </p>
                                        </div>
                                        <div>
                                            <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                                                {projects.links.map((link, index) => (
                                                    <Link
                                                        key={index}
                                                        href={link.url || '#'}
                                                        className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                                                            link.active
                                                                ? 'z-10 bg-blue-50 border-blue-500 text-blue-600'
                                                                : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                                                        } ${index === 0 ? 'rounded-l-md' : ''} ${
                                                            index === projects.links.length - 1 ? 'rounded-r-md' : ''
                                                        }`}
                                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                                    />
                                                ))}
                                            </nav>
                                        </div>
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
