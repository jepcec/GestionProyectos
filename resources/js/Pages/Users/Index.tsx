import React from 'react';
import { Head, Link } from '@inertiajs/react';

interface Role { id: number; name: string }
interface User { id: number; name: string; email: string; is_enabled: boolean; roles: Role[] }

interface PaginationLink { url: string | null; label: string; active: boolean }
interface Paginated<T> {
  data: T[];
  links: PaginationLink[];
}

export default function Index({ users }: { users: Paginated<User> }) {
  return (
    <div className="max-w-6xl mx-auto p-6">
      <Head title="Usuarios" />
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-semibold">Usuarios</h1>
        <Link href={route('users.create')} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">Nuevo Usuario</Link>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border">
          <thead>
            <tr className="bg-gray-100">
              <th className="text-left p-2 border">Nombre</th>
              <th className="text-left p-2 border">Email</th>
              <th className="text-left p-2 border">Estado</th>
              <th className="text-left p-2 border">Roles</th>
              <th className="text-left p-2 border">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {users.data.map((u) => (
              <tr key={u.id} className="border-t">
                <td className="p-2 border">{u.name}</td>
                <td className="p-2 border">{u.email}</td>
                <td className="p-2 border">{u.is_enabled ? 'Habilitado' : 'Deshabilitado'}</td>
                <td className="p-2 border">{u.roles.map(r => r.name).join(', ')}</td>
                <td className="p-2 border space-x-2">
                  <Link href={route('users.show', u.id)} className="text-blue-600 hover:underline">Ver</Link>
                  <Link href={route('users.edit', u.id)} className="text-green-600 hover:underline">Editar</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex gap-2 mt-4 flex-wrap">
        {users.links.map((l, i) => (
          <Link
            key={i}
            href={l.url || '#'}
            className={`px-3 py-1 rounded ${l.active ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'} ${!l.url ? 'opacity-50 cursor-not-allowed' : ''}`}
            preserveScroll
          >
            <span dangerouslySetInnerHTML={{ __html: l.label }} />
          </Link>
        ))}
      </div>
    </div>
  );
}
