import { Head, Link } from '@inertiajs/react';
import type React from 'react';
import FileUpload from '@/Components/FileUpload';

// Declaración del helper global route()
declare const route: (name: string, params?: any) => string;

interface User {
  id: number;
  name: string;
}

interface Task {
  id: number;
  title: string;
  status: string;
  assigned_user?: User | null;
}

interface FileItem {
  id: number;
  name: string;
  url: string;
  uploaded_by: User;
}

interface Project {
  id: number;
  title: string;
  description: string;
  start_date: string;
  end_date: string;
  status: string;
  creator: User;
  users: User[];
  tasks: Task[];
  files?: FileItem[];
}

interface ShowProps {
  project: Project;
}

export default function Show({ project }: ShowProps) {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <Head title={`Proyecto: ${project.title}`} />

      <h1 className="text-3xl font-semibold mb-4">{project.title}</h1>

      <div className="space-y-2 mb-6">
        <p><strong>Descripción:</strong> {project.description}</p>
        <p><strong>Fecha inicio:</strong> {project.start_date}</p>
        <p><strong>Fecha fin:</strong> {project.end_date}</p>
        <p><strong>Estado:</strong> {project.status}</p>
        <p><strong>Creador:</strong> {project.creator.name}</p>
      </div>

      <h2 className="text-xl font-semibold mb-2">Usuarios asignados</h2>
      <ul className="list-disc ml-6 mb-6">
        {project.users.map((u) => (
          <li key={u.id}>{u.name}</li>
        ))}
      </ul>

      <h2 className="text-xl font-semibold mb-2">Tareas</h2>
      <ul className="list-disc ml-6 mb-6">
        {project.tasks.length === 0 && <p>No hay tareas registradas.</p>}
        {project.tasks.map((t) => (
          <li key={t.id}>
            {t.title} — <strong>{t.status}</strong>{' '}
            {t.assigned_user && <span>(Asignado a {t.assigned_user.name})</span>}
          </li>
        ))}
      </ul>

      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-2">Archivos</h2>
        {/* Subida de archivos al proyecto */}
        <div className="mb-4">
          <FileUpload fileableType="App\\Models\\Project" fileableId={project.id} />
        </div>
        {project.files && project.files.length > 0 ? (
          <ul className="space-y-2">
            {project.files.map((f) => (
              <li key={f.id} className="flex items-center justify-between gap-3">
                <div>
                  <span className="font-medium">{f.name}</span>
                  <span className="text-sm text-gray-600"> — subido por {f.uploader.name}</span>
                </div>
                <div className="flex gap-2">
                  <a
                    href={route('files.download', f.id)}
                    className="px-2 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    Descargar
                  </a>
                  <Link
                    href={route('files.destroy', f.id)}
                    method="delete"
                    as="button"
                    className="px-2 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700"
                  >
                    Eliminar
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-gray-600">No hay archivos adjuntos.</p>
        )}
      </div>

      <div className="flex gap-3 pt-4">
        <Link
          href={route('projects.edit', project.id)}
          className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
        >
          Editar
        </Link>
        <Link
          href={route('projects.index')}
          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
        >
          Volver
        </Link>
      </div>
    </div>
  );
}
