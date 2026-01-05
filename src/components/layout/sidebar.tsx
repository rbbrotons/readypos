"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { menuItems } from "@/src/config/menu-config";

// --- PrimeReact ---
import { Sidebar as PrimeSidebar } from 'primereact/sidebar'; // Renombramos para no confundir
import { Button } from 'primereact/button';
import { Avatar } from 'primereact/avatar';
import { Ripple } from 'primereact/ripple';

export default function Sidebar() {
    const [mobileVisible, setMobileVisible] = useState(false);

    return (
        <>
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

    return (
        <div className="flex flex-col h-full">
            {/* 1. HEADER */}
            <div className="flex items-center gap-3 p-6 h-24 border-b border-gray-50">
                <div className="bg-teal-500 p-2 rounded-lg shadow-md shadow-teal-200">
                    <i className="pi pi-verified text-white text-xl"></i>
                </div>
                <div>
                    <h1 className="font-bold text-2xl text-gray-800 tracking-tight">ReadyPOS</h1>
                </div>
            </div>

            {/* 2. BODY (Menú) */}
            <nav className="flex-1 overflow-y-auto py-6 px-4">
                <ul className="space-y-2">
                    {menuItems.map((item) => {
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
                        label="GD" 
                        size="large" 
                        shape="circle" 
                        style={{ backgroundColor: '#7C3AED', color: '#ffffff' }} 
                    />
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-gray-800 truncate">Gastón Daza</p>
                        <p className="text-xs text-gray-500 uppercase">Admin</p>
                    </div>
                    <i className="pi pi-sign-out text-gray-400"></i>
                </div>
            </div>
        </div>
    );
}