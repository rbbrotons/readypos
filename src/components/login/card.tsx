"use client";

import React, { useState } from "react";
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Message } from "primereact/message";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Poppins } from "next/font/google";

const logoFont = Poppins({
  subsets: ["latin"],
  weight: ["500", "700", "900"],
  display: "swap",
});

export default function CardLog() {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault(); // Evita que la página se recargue
    setError("");       // Limpiamos errores de intentos anteriores
    setLoading(true);   // Activamos el estado de carga

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // Enviamos los datos a la API que usa Prisma con Railway
        body: JSON.stringify({ 
            usuario: username, 
            contraseña: password 
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        // Si el backend devuelve 401 (Usuario no encontrado o clave mal)
        setError(data.message || "Error al iniciar sesión");
        return;
      }

      // SI EL LOGIN ES EXITOSO:
      // 1. Guardamos el token para futuras peticiones a la base de datos
      localStorage.setItem("token", data.token);
      
      // 2. Guardamos el objeto usuario que trae el ROL para el menú
      localStorage.setItem("user", JSON.stringify(data.user));

      // 3. Redirigimos al Dashboard (donde se verá el menú filtrado)
      router.push("/dashboard");

    } catch (err) {
      console.error("Detalles del error de login:", err);
      setError("Error de conexión. Revisa tu internet o el estado de Railway.");
    } finally {
      setLoading(false); // Apagamos el estado de carga pase lo que pase
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full md:w-200 h-auto md:h-125">
        <Card className="h-full">
          <form onSubmit={handleLogin} className="flex flex-col md:flex-row h-full">

            {/* LADO IZQUIERDO */}
            <div className="flex flex-row md:flex-col items-center justify-center gap-4 p-6 w-full md:w-1/2 h-full">
              <div className="relative  w-24 h-24  md:w-64 md:h-64 shrink-0">
                <Image
                  src="/logo-bg.png"
                  alt="Logo readyPOS"
                  fill
                  className="object-contain"
                  priority
                />
              </div>

              <h1
                className={`${logoFont.className} text-3xl font-black tracking-tight select-none text-[#924f9f] text-center`}
              >
                ready <span className="font-bold text-[#23b1af]">POS</span>
              </h1>
            </div>

            {/* DIVIDER */}
            <div className="hidden md:block w-px bg-gray-300 self-stretch mt-8"></div>

            {/* LADO DERECHO */}
            <div className="flex flex-col justify-center md:mt-8 md:gap-8 px-8 w-full md:w-1/2 h-full">

              <div className="text-center">
                <h2 className="text-2xl font-semibold">Bienvenid@</h2>
                <p className="text-sm text-gray-500">
                  Iniciá sesión en tu cuenta
                </p>
              </div>
              {/*mostramos el error si la api de railway nos dice que algo salio mal*/}
              {error && <Message severity="error" text={error} className="mt-2 w-full"/>}

              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-1 mt-4">
                  <label htmlFor="username" className="text-sm font-medium">
                    Usuario
                  </label>
                  <InputText
                    id="username"
                    value={username}
                    onChange={(e) => setUserName(e.target.value)}
                    className="w-full border border-gray-300 rounded-md py-1"
                    required //obligatorio para que el formulario no se envie vacio
                  />
                </div>

                <div className="flex flex-col gap-1 md:mt-8">
                  <label htmlFor="password" className="text-sm font-medium">
                    Contraseña
                  </label>
                  <Password
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    toggleMask
                    feedback={false}
                    className="w-full h-full"
                    inputClassName="w-84 h-full border border-gray-300 rounded-md py-1.5"
                    required
                  />
                </div>
              </div>

              <button 
                type="submit"
                disabled={loading} 
                className={`w-full bg-[#23b1af] text-white py-2 rounded-md font-semibold hover:opacity-90 transition mt-8 mb-8 md:mt-8 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                
              >
                {loading ? "Iniciando sesión..." : "Iniciar sesión"}
              </button>

            </div>
          </form>
        </Card>
      </div>
    </div>
  );
}
