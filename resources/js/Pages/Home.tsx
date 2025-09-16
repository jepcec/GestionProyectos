import { Head, Link, usePage } from '@inertiajs/react';

export default function Home() {
  const { props } = usePage<{ auth: { user: any; roles: string[] } }>();
  const user = props?.auth?.user;
  const roles = props?.auth?.roles || [];
  const isAdmin = roles.includes('Administrador');

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 dark:bg-black dark:text-white/80">
      <Head title="Inicio" />

      <header className="mx-auto max-w-7xl px-6 py-6 flex items-center justify-between">
        <div className="text-xl font-semibold">GestionProyectos</div>
        <nav className="flex items-center gap-3">
          {user ? (
            <>
              <Link href={route('dashboard')} className="px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-zinc-900">Dashboard</Link>
              {isAdmin && (
                <Link href={route('users.index')} className="px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-zinc-900">Usuarios</Link>
              )}
            </>
          ) : (
            <>
              <Link href={route('login')} className="px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-zinc-900">Iniciar sesión</Link>
              <Link href={route('register')} className="px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-zinc-900">Registrarse</Link>
            </>
          )}
        </nav>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-16 grid md:grid-cols-2 items-center gap-10">
        <section>
          <h1 className="text-4xl font-bold mb-4">Bienvenido a GestionProyectos</h1>
          <p className="text-lg text-gray-600 dark:text-white/70 mb-8">
            Organiza proyectos, asigna tareas y colabora con tu equipo de forma sencilla.
          </p>
          <div className="flex gap-3">
            {user ? (
              <Link href={route('dashboard')} className="bg-blue-600 text-white px-5 py-3 rounded hover:bg-blue-700">Ir al Dashboard</Link>
            ) : (
              <>
                <Link href={route('login')} className="bg-blue-600 text-white px-5 py-3 rounded hover:bg-blue-700">Iniciar sesión</Link>
                <Link href={route('register')} className="px-5 py-3 rounded border hover:bg-gray-100 dark:hover:bg-zinc-900">Crear cuenta</Link>
              </>
            )}
          </div>
        </section>
        <section>
          <div className="rounded-xl border bg-white dark:bg-zinc-900 dark:border-zinc-800 p-6 shadow">
            <h2 className="text-xl font-semibold mb-3">Características</h2>
            <ul className="list-disc ms-6 space-y-2 text-gray-700 dark:text-white/70">
              <li>Gestión de usuarios con múltiples roles</li>
              <li>Proyectos con asignación de miembros</li>
              <li>Tareas y estados con seguimiento</li>
            </ul>
          </div>
        </section>
      </main>

      <footer className="py-10 text-center text-sm text-gray-500">© {new Date().getFullYear()} GestionProyectos</footer>
    </div>
  );
}
