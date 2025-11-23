import { Head, Link, useForm } from "@inertiajs/react";

export default function Home() {
    const loginForm = useForm({
        email: "",
        password: "",
        remember: false,
    });

    const registerForm = useForm({
        name: "",
        surname: "",
        email: "",
        email_confirmation: "",
        password: "",
        password_confirmation: "",
    });

    const submitLogin = (e: React.FormEvent) => {
        e.preventDefault();
        loginForm.post(route("login"));
    };

    const submitRegister = (e: React.FormEvent) => {
        e.preventDefault();
        registerForm.post(route("register"));
    };

    return (
        <div className="min-h-screen bg-[#e9ebee] dark:bg-black">
            <Head title="Inicio" />

            {/* ====================== HEADER ====================== */}
            <header className="w-full bg-[#3b5998] py-3 px-6 flex justify-between items-center text-white">
                {/* LOGO */}
                <h1 className="text-3xl font-bold tracking-wide" style={{ fontFamily: "Klavika" }}>
                    Gestión de Proyectos
                </h1>

                {/* LOGIN AREA */}
                <form onSubmit={submitLogin} className="flex items-end gap-4 text-sm">
                    {/* EMAIL */}
                    <div className="flex flex-col">
                        <label className="text-xs mb-1">Correo</label>
                        <input
                            type="email"
                            className="px-2 py-1 text-black rounded-sm"
                            value={loginForm.data.email}
                            onChange={(e) => loginForm.setData("email", e.target.value)}
                            required
                        />
                        <label className="flex items-center gap-1 mt-1 text-xs text-white">
                            <input
                                type="checkbox"
                                checked={loginForm.data.remember}
                                onChange={(e) => loginForm.setData("remember", e.target.checked)}
                            />
                            Keep me logged in
                        </label>
                    </div>

                    {/* PASSWORD */}
                    <div className="flex flex-col">
                        <label className="text-xs mb-1">Contraseña</label>
                        <input
                            type="password"
                            className="px-2 py-1 text-black rounded-sm"
                            value={loginForm.data.password}
                            onChange={(e) => loginForm.setData("password", e.target.value)}
                            required
                        />
                        <Link
                            href={route("password.request")}
                            className="text-xs text-blue-200 hover:underline mt-1"
                        >
                            ¿Olvidaste tu contraseña?
                        </Link>
                    </div>

                    {/* LOGIN BUTTON */}
                    <button
                        type="submit"
                        className="bg-[#334d84] px-4 py-1 rounded-md border border-[#2b4170] hover:bg-[#2d4373]"
                    >
                        Ingresar
                    </button>
                </form>
            </header>

            {/* ====================== MAIN ====================== */}
            <main
                className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 px-6 py-14"
                style={{
                    background:
                        "linear-gradient(to bottom, #fefefe 0%, #e9ebee 70%)",
                }}
            >
                {/* LEFT SIDE (Marketing / Features) */}
                <section className="flex flex-col justify-center">
                    <h2 className="text-3xl font-bold mb-4 text-gray-800 dark:text-white">
                        Gestiona tus proyectos desde cualquier lugar
                    </h2>

                    <p className="text-lg text-gray-700 dark:text-white/80 mb-6">
                        GestionProyectos te ayuda a organizar tus tareas, supervisar avances
                        y coordinar equipos de manera eficiente.
                    </p>

                    <ul className="space-y-3 text-gray-700 dark:text-white/80 text-lg ml-6 list-disc">
                        <li>Asignación de usuarios a proyectos</li>
                        <li>Subida de archivos en tareas y proyectos</li>
                        <li>Seguimiento del estado de cada tarea</li>
                        <li>Panel de administración para roles avanzados</li>
                    </ul>
                </section>

                {/* RIGHT SIDE — SIGN UP FORM */}
                <section>
                    <div className="bg-white dark:bg-zinc-900 shadow rounded-xl p-8 border border-gray-300 dark:border-zinc-800">
                        <h2 className="text-4xl font-bold mb-4 text-black dark:text-white">
                            Registrarse
                        </h2>

                        <form onSubmit={submitRegister} className="space-y-4">
                            {/* NAME + SURNAME */}
                            <div className="grid grid-cols-2 gap-3">
                                <input
                                    type="text"
                                    placeholder="First name"
                                    className="px-3 py-3 border rounded-md w-full"
                                    value={registerForm.data.name}
                                    onChange={(e) =>
                                        registerForm.setData("name", e.target.value)
                                    }
                                    required
                                />
                                <input
                                    type="text"
                                    placeholder="Surname"
                                    className="px-3 py-3 border rounded-md w-full"
                                    value={registerForm.data.surname}
                                    onChange={(e) =>
                                        registerForm.setData("surname", e.target.value)
                                    }
                                    required
                                />
                            </div>

                            {/* EMAIL */}
                            <input
                                type="email"
                                placeholder="Email or mobile number"
                                className="w-full px-3 py-3 border rounded-md"
                                value={registerForm.data.email}
                                onChange={(e) =>
                                    registerForm.setData("email", e.target.value)
                                }
                                required
                            />

                            {/* EMAIL CONFIRMATION */}
                            <input
                                type="email"
                                placeholder="Re-enter email or mobile number"
                                className="w-full px-3 py-3 border rounded-md"
                                value={registerForm.data.email_confirmation}
                                onChange={(e) =>
                                    registerForm.setData(
                                        "email_confirmation",
                                        e.target.value
                                    )
                                }
                                required
                            />

                            {/* PASSWORD */}
                            <input
                                type="password"
                                placeholder="New password"
                                className="w-full px-3 py-3 border rounded-md"
                                value={registerForm.data.password}
                                onChange={(e) =>
                                    registerForm.setData("password", e.target.value)
                                }
                                required
                            />

                            {/* PASSWORD CONFIRM */}
                            <input
                                type="password"
                                placeholder="Confirm password"
                                className="w-full px-3 py-3 border rounded-md"
                                value={registerForm.data.password_confirmation}
                                onChange={(e) =>
                                    registerForm.setData(
                                        "password_confirmation",
                                        e.target.value
                                    )
                                }
                                required
                            />

                            {/* SUBMIT BUTTON */}
                            <button
                                type="submit"
                                className="w-full bg-gradient-to-b from-[#67ae55] to-[#578843] text-white font-bold text-xl py-3 rounded-md shadow hover:brightness-110"
                            >
                                Sign Up
                            </button>
                        </form>

                        {/* FOOTER LINK */}
                        <div className="border-t mt-6 pt-4 text-sm text-gray-700 dark:text-white/80">
                            Create a Page for a{" "}
                            <span className="font-bold text-blue-600 cursor-pointer hover:underline">
                                celebrity, band or business.
                            </span>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}
