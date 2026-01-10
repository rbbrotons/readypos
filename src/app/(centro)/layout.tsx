import React from "react";
import Sidebar from "@/src/components/layout/sidebar";
import Topbar from "@/src/components/layout/topbar";

export default function CentroLayout({
    children,
    }: {
    children: React.ReactNode;
    }) {
    return (
        // 1. CONTENEDOR PADRE
        // flex: Crea la disposición horizontal (Izquierda | Derecha)
        // h-screen: Ocupa toda la pantalla y evita scroll en el cuerpo del navegador
        // overflow-hidden: Importante para que no aparezcan doble barras de scroll
        <div className="flex h-screen w-full bg-gray-50 overflow-hidden">
        
            {/* 2. EL SIDEBAR (Izquierda Fija) */}
            <Sidebar />
            
            {/* 3. COLUMNA DERECHA (El resto de la pantalla) 
                flex-1: Toma todo el ancho disponible restando el sidebar
                flex-col: Organiza sus hijos verticalmente (Primero Topbar, luego Main)
                min-w-0: Un truco de CSS para evitar que tablas grandes rompan el diseño
            */}
            <div className="flex-1 flex flex-col min-w-0">
                
                {/* A. LA BARRA SUPERIOR 
                    Al estar dentro de flex-col y primero, se queda arriba.
                */}
                <Topbar />

                {/* B. ÁREA DE CONTENIDO (Debajo del Topbar) 
                    flex-1: Toma toda la altura sobrante (Pantalla - Altura del Topbar)
                    overflow-y-auto: Aquí es donde ocurre el SCROLL. Solo se mueve esto, 
                                        el Topbar y el Sidebar se quedan quietos.
                */}
                <main className="flex-1 overflow-y-auto transition-all duration-300 ease-in-out scroll-smooth">
                    
                    {/* Contenedor para márgenes internos */}
                    <div className="p-4 md:p-8">
                        
                        {/* Limitador de ancho para pantallas gigantes */}
                        <div className="mx-auto max-w-7xl animate-fade-in">
                            {children}
                        </div>
                        
                    </div>
                </main>

            </div>

        </div>
    );
}