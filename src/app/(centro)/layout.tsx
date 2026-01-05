import React from "react";
import Sidebar from "@/src/components/layout/sidebar";

export default function CentroLayout({
    children,
    }: {
    children: React.ReactNode;
    }) {
    return (
        // CONTENEDOR PRINCIPAL
        // h-screen: Ocupa el 100% de la altura de la ventana
        // flex: Pone los elementos uno al lado del otro
        // bg-gray-50: Un fondo gris muy suavecito para toda la app (estilo moderno)
        <div className="flex h-screen w-full bg-gray-50">
        
        {/* 1. EL SIDEBAR (Izquierda) 
            Ya tiene su propia lógica para ocultarse en móvil o quedarse fijo en PC.
        */}
        <Sidebar />
        
        {/* 2. ÁREA DE CONTENIDO (Derecha) 
            flex-1: Toma todo el espacio sobrante
            overflow-y-auto: Permite scroll independiente (si la tabla es larga, el sidebar no se mueve)
        */}
        <main className="flex-1 h-full overflow-y-auto transition-all duration-300 ease-in-out">
            
            {/* Un contenedor interno para dar márgenes bonitos */}
            {/* p-4 en móvil, p-8 en escritorio */}
            <div className="min-h-full p-4 pt-24 md:p-8 md:pt-8">
                
                {/* Limitador de ancho (max-w-7xl) para que en pantallas gigantes 
                    (iMac, monitores 4k) el contenido no se estire horriblemente */}
                <div className="mx-auto max-w-7xl">
                    {children}
                </div>
                
            </div>
        </main>

        </div>
    );
}