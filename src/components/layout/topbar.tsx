"use client";
import React from 'react';
import { Button } from 'primereact/button';
import { Badge } from 'primereact/badge';

export default function Topbar() {
    return (
        <header className="h-20 px-8 flex items-center justify-between sticky top-0 z-10 bg-gray-50/80 backdrop-blur-sm transition-all border-b border-gray-100/50">
            
            {/* 1. IZQUIERDA (33%): Espacio vacío (o futuro buscador) */}
            <div className="w-1/3 flex justify-start">
            </div>

            {/* 2. CENTRO (33%): Tu Marca */}
            <div className="w-1/3 flex justify-center text-center">
                <h1 className="text-3xl font-black text-gray-800 tracking-tight uppercase select-none cursor-default">
                    🌈 Almacen <span className="text-teal-600 font-medium">Mili</span>

                    {/* Hardcodeo para luego modificar luego y ver como queda la pagina */}

                </h1>
            </div>

            {/* 3. DERECHA (33%): Solo Notificaciones */}
            <div className="w-1/3 flex justify-end items-center">
                
                {/* Botón de Notificaciones con Badge */}
                <div className="relative">
                    <Button 
                        icon="pi pi-bell" 
                        rounded 
                        text 
                        severity="secondary" 
                        aria-label="Notificaciones"
                        className="w-12 h-12 hover:bg-white hover:shadow-sm transition-all text-gray-600 focus:ring-0"
                    />
                    {/* El puntito rojo indicando que hay 3 avisos */}
                    <Badge 
                        value="3" 
                        severity="danger" 
                        className="absolute top-1 right-1 transform translate-x-1/4 -translate-y-1/4 scale-75" 
                    />
                </div>

            </div>

        </header>
    );
}