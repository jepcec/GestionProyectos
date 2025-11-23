import { Head, useForm } from '@inertiajs/react';
import type React from 'react';

declare const route: (name: string, params?: any) => string;

interface User {
  id: number;
  name: string;
}

interface Project {
  id: number;
  title: string;
  description: string;
  start_date: string;
  end_date: string;
  status: string;
  users: User[];
}

interface EditProps {
  project: Project;
  users: User[];
}

export default function Edit({ project, users }: EditProps) {
  const { data, setData, put, processing, errors } = useForm({
    title: project.title,
    description: project.description,
    start_date: project.start_date,
    end_date: project.end_date,
    status: project.status,
    users: project.users.map((u) => u.id),
  });

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    put(route('projects.update', project.id));
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <Head title="Editar proyecto" />
      <h1 className="text-2xl font-semibold mb-4">Editar proyecto</h1>

      <form onSubmit={submit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Título</label>
          <input
            type="text"
            className="mt-1 w-full border rounded px-3 py-2"
            value={data.title}
            onChange={(e) => setData('title', e.target.value)}
          />
          {errors.title && <p className="text-sm text-red-600">{errors.title}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium">Descripción</label>
          <textarea
            className="mt-1 w-full border rounded px-3 py-2"
            value={data.description}
            onChange={(e) => setData('description', e.target.value)}
          />
          {errors.description && <p className="text-sm text-red-600">{errors.description}</p>}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium">Fecha de inicio</label>
            <input
              type="date"
              className="mt-1 w-full border rounded px-3 py-2"
              value={data.start_date}
              onChange={(e) => setData('start_date', e.target.value)}
            />
            {errors.start_date && <p className="text-sm text-red-600">{errors.start_date}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium">Fecha de fin</label>
            <input
              type="date"
              className="mt-1 w-full border rounded px-3 py-2"
              value={data.end_date}
              onChange={(e) => setData('end_date', e.target.value)}
            />
            {errors.end_date && <p className="text-sm text-red-600">{errors.end_date}</p>}
          </div>
        </div>

        {/* Campo STATUS */}
        <div>
          <label className="block text-sm font-medium">Estado</label>
          <select
            className="mt-1 w-full border rounded px-3 py-2"
            value={data.status}
            onChange={(e) => setData('status', e.target.value)}
          >
            <option value="pending">Pendiente</option>
            <option value="in_progress">En progreso</option>
            <option value="completed">Completado</option>
            <option value="cancelled">Cancelado</option>
          </select>
          {errors.status && <p className="text-sm text-red-600">{errors.status}</p>}
        </div>

        {/* Usuarios asignados */}
        <div>
          <label className="block text-sm font-medium">Usuarios asignados</label>
          <select
            multiple
            className="mt-1 w-full border rounded px-3 py-2 h-40"
            value={data.users.map(String)}
            onChange={(e) => {
              const selectedIds = Array.from(e.target.selectedOptions).map((o) => Number(o.value));
              setData('users', selectedIds);
            }}
          >
            {users.map((u) => (
              <option key={u.id} value={u.id}>
                {u.name}
              </option>
            ))}
          </select>
          {errors.users && <p className="text-sm text-red-600">{errors.users}</p>}
        </div>

        <div className="pt-2">
          <button
            type="submit"
            disabled={processing}
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
          >
            Actualizar
          </button>
        </div>
      </form>
    </div>
  );
}
