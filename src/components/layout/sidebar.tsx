"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { menuItems, UserRole } from "@/src/config/menu-config";
import Image from "next/image"; // <--- Agrega esto junto a los otros imports

// --- PrimeReact ---
import { Sidebar as PrimeSidebar } from 'primereact/sidebar'; // Renombramos para no confundir
import { Button } from 'primereact/button';
import { Avatar } from 'primereact/avatar';
import { Ripple } from 'primereact/ripple';
//-- fuente del logo ---
import { Poppins } from "next/font/google";
// el dialog de confirmacion
import { ConfirmDialog } from 'primereact/confirmdialog';
import { showConfirm } from "../common/confirmModal";

// Configuramos la fuente solo para usarla aquí
const logoFont = Poppins({
    subsets: ["latin"],
    weight: ["500", "700", "900"], // Cargamos Medium, Bold y Black
    display: "swap", // <--- Asegura que el texto se vea inmediato con una fuente básica y luego cambie a Poppins
});

export default function Sidebar() {
    const [mobileVisible, setMobileVisible] = useState(false);

    return (
        <>
        {/* dialog de confirmacion */}
        <ConfirmDialog 
            breakpoints={{ '960px': '75vw', '640px': '90vw' }} 
            style={{ width: '35vw', minWidth: '350px' }} 
            draggable={false}
            resizable={false}
            contentStyle={{ padding: '1.5rem' }} 
            // Usamos pt-0 para que no haya espacio extra arriba de los botones
            className="p-fluid"
        />
        {/* =======================================================
            VISTA MÓVIL (Celular)
            1. Un botón hamburguesa arriba a la izquierda
            2. El componente Sidebar de PrimeReact que se abre/cierra
        ======================================================= */}
        <div className="md:hidden fixed top-4 left-4 z-50">
            <Button 
                icon="pi pi-bars" 
                onClick={() => setMobileVisible(true)} 
                className="p-button-rounded p-button-text p-button-lg bg-white shadow-md text-teal-600"
                aria-label="Abrir menú"
            />
        </div>

        <PrimeSidebar 
            visible={mobileVisible} 
            onHide={() => setMobileVisible(false)}
            className="w-72" // Ancho del sidebar móvil
        >
            {/* Reutilizamos el mismo contenido */}
            <SidebarContent />
        </PrimeSidebar>


        {/* =======================================================
            VISTA ESCRITORIO (PC)
            Una barra fija (aside) que siempre está visible
            'hidden md:flex': Oculto en móvil, visible en PC
        ======================================================= */}
        <aside className="hidden md:flex h-screen w-72 flex-col bg-white border-r border-gray-200 shadow-sm font-sans select-none sticky top-0">
            <SidebarContent />
        </aside>
        </>
    );
}


// =======================================================
// COMPONENTE INTERNO: EL CONTENIDO DEL MENÚ
// (Lo extrajimos aquí para no escribirlo dos veces)
// =======================================================
function SidebarContent() {
    const pathname = usePathname();
    const [userRole, setUserRole] = React.useState<UserRole | null>(null);
    const [userName, setUserName] = React.useState<string>("Usuario");

    React.useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            const user = JSON.parse(storedUser);
            setUserRole(user.rol as UserRole); // Guardamos "ADMIN" o "EMPLEADO"
            setUserName(user.nombre || "Usuario");
        }
    }, []);

    const handleLogout = () => {
        showConfirm({
            header: '¿Cerrar sesión?',
            message: '¿Estás seguro que deseas salir del sistema?',
            icon: 'pi pi-power-off',
            acceptLabel: 'Salir',
            rejectLabel: 'Cancelar',
            onAccept: () => {
                // 1. Borramos el token y los datos del usuario del LocalStorage
                localStorage.removeItem("token");
                localStorage.setItem("user", ""); // Opcional: limpiar también el objeto user
                localStorage.clear(); // Esto borra TODO, es lo más seguro para cerrar sesión
                // 2. Redirigimos al Login inmediatamente
                window.location.href = "/login"; 
            }
        });
    };

    // --- NUEVO: Filtrar menú según rol ---
    const filteredMenu = menuItems.filter((item) => {
    // Si no hay roles requeridos, es para todos
        if (!item.roles) return true;
        
        // Si el usuario no está logueado (userRole es null), no mostramos ítems protegidos
        if (!userRole) return false;

        // Verificamos si el rol del usuario está en la lista de permitidos
        return item.roles.includes(userRole);
    });

    return (
        <div className="flex flex-col h-full">
            {/* 1. HEADER */}
            <div className="flex items-center gap-3 p-6 h-24 border-b border-gray-50">
                {/* --- AQUÍ ESTÁ EL CAMBIO --- */}
                <div className="relative w-15 h-15 shrink-0">
                    <Image 
                        src="/logo-bg.png"
                        alt="Logo readyPOS"
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-contain" // Esto asegura que el logo se vea entero sin recortarse
                        priority
                    />
                </div>
                {/* --------------------------- */}
                <div>
                    <h1 className={`${logoFont.className} text-3xl font-black tracking-tight select-none cursor-default text-[#924f9f]`}>
                        ready <span className="font-bold text-[#23b1af]">POS</span>
                    </h1>
                </div>
            </div>

            {/* 2. BODY (Menú) */}
            <nav className="flex-1 overflow-y-auto py-6 px-4">
                <ul className="space-y-2">
                    {filteredMenu.map((item) => {
                        const isActive = pathname.startsWith(item.href);
                        return (
                            <li key={item.href}>
                                <Link
                                    href={item.href}
                                    className={`
                                        p-ripple flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-200 relative overflow-hidden group
                                        ${isActive 
                                            ? "bg-teal-500 text-white shadow-lg shadow-teal-500/30 font-medium" 
                                            : "text-gray-600 hover:bg-gray-50 hover:text-teal-600"
                                        }
                                    `}
                                >
                                    <Ripple 
                                        pt={{
                                            root: { style: { background: isActive ? 'rgba(255,255,255, 0.3)' : 'rgba(20, 184, 166, 0.1)' } }
                                        }}
                                    />
                                    <i className={`${item.icon} text-lg`}></i>
                                    <span className="text-sm tracking-wide">{item.title}</span>
                                    
                                    {isActive && <i className="pi pi-angle-right ml-auto text-xs opacity-80"></i>}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </nav>

            {/* 3. FOOTER (Usuario) */}
            <div className="p-4 border-t border-gray-100 bg-gray-50 mt-auto">
                <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-white cursor-pointer transition-colors">
                    <Avatar 
                        label={userName.substring(0, 2).toUpperCase()} // Usa las iniciales del nombre real
                        size="large" 
                        shape="circle" 
                        style={{ backgroundColor: userRole === 'ADMIN' ? '#7C3AED' : '#23b1af', color: '#ffffff' }}
                    />
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-gray-800 truncate">{userName}</p>
                        <p className="text-xs text-gray-500 uppercase">{userRole || 'Cargando...'}</p>
                    </div>
                    {/* BOTÓN DE CERRAR SESIÓN */}
                    <button 
                        onClick={handleLogout}
                        className="p-2 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-500 transition-all"
                        title="Cerrar sesión"
                    >
                        <i className="pi pi-sign-out text-gray-400"></i>
                    </button>
                </div>
            </div>
        </div>
    );
}