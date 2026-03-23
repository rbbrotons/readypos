"use client";

import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { SelectButton } from 'primereact/selectbutton';
import { InputSwitch } from 'primereact/inputswitch';
import { Dropdown, DropdownChangeEvent } from 'primereact/dropdown';
import { Tag } from 'primereact/tag';
import { showConfirm } from '@/src/components/common/confirmModal';


interface Usuario {
    id_usuario: number;
    nombre_empleado: string | null;
    apellido_empleado: string | null;
    usuario: string | null;
    activo: boolean | null;
    rol: 'ADMIN' | 'EMPLEADO' | null;
}

export default function EmpleadosPage() {
    const [usuarios, setUsuarios] = useState<Usuario[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [showDialog, setShowDialog] = useState<boolean>(false);
    const [globalFilter, setGlobalFilter] = useState<string>('');
    const [filtroRol, setFiltroRol] = useState<string | null>(null);

    const opcionesRol = [
        { label: 'Todos', value: null },
        { label: 'Admin', value: 'ADMIN' },
        { label: 'Empleado', value: 'EMPLEADO' }
    ];
    const [nuevoEmpleado, setNuevoEmpleado] = useState({
        nombre_empleado: '',
        apellido_empleado: '',
        usuario: '',
        contraseña: '',
        rol: 'EMPLEADO'
    });

    const roles = [
        { label: 'Administrador', value: 'ADMIN' },
        { label: 'Empleado', value: 'EMPLEADO' }
    ];

    const renderHeader = () => {
        return (
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 p-4 border-b border-gray-100 bg-gray-50/50">
                {/* Buscador Global */}
                <div className="p-input-icon-left w-full md:w-80">
                    <i className="pi pi-search absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                    <InputText 
                        value={globalFilter} 
                        onChange={(e) => setGlobalFilter(e.target.value)} 
                        placeholder="Buscar por usuario, nombre o rol..." 
                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:border-blue-300 focus:ring-2 focus:ring-blue-100 outline-none transition-all placeholder:text-gray-400"
                    />
                </div>

                {/* Filtros Rápidos por Rol */}
                <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto justify-end">
                    <span className="text-sm font-medium text-gray-500">Filtrar por:</span>
                    <SelectButton 
                        value={filtroRol} 
                        options={opcionesRol} 
                        onChange={(e) => setFiltroRol(e.value)} 
                        className="custom-selectbutton" // Usaremos CSS para estilizarlo
                    />
                </div>
            </div>
        );
    };
    const header = renderHeader(); // trae el jsx

    const fetchEmpleados = async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/empleados');
            const data: Usuario[] = await res.json();
            setUsuarios(data);
        } catch (error) {
            console.error("Error cargando empleados:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEmpleados();
    }, []);

    const handleToggleStatus = async (usuario: Usuario) => {
        const nuevoEstado = !usuario.activo;
        showConfirm({
            header: 'Confirmar cambio',
            message: `¿Deseas ${nuevoEstado ? 'activar' : 'desactivar'} a ${usuario.usuario}?`,
            onAccept: async () => {
                try {
                    await fetch('/api/empleados', {
                        method: 'PATCH',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ id_usuario: usuario.id_usuario, activo: nuevoEstado })
                    });
                    fetchEmpleados();
                } catch (e) { console.error(e); }
            }
        });
    };

    const guardarEmpleado = async () => {
        try {
            const res = await fetch('/api/empleados', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(nuevoEmpleado)
            });
            if (res.ok) {
                setShowDialog(false);
                fetchEmpleados();
                setNuevoEmpleado({ nombre_empleado: '', apellido_empleado: '', usuario: '', contraseña: '', rol: 'EMPLEADO' });
            }
        } catch (e) { console.error(e); }
    };

    // TEMPLATES CON "AIRE" (Padding y Flex)
    const usuarioBody = (rowData: Usuario) => (
        <div className="flex items-center gap-3 py-2 px-1">
            <i className="pi pi-user text-blue-500 bg-blue-50 p-2 rounded-full" style={{ fontSize: '1rem' }}></i>
            <span className="font-medium text-gray-700">{rowData.usuario}</span>
        </div>
    );

    const statusBody = (rowData: Usuario) => (
        <div className="flex justify-center items-center py-2 px-4">
            <InputSwitch 
                checked={!!rowData.activo} 
                onChange={() => handleToggleStatus(rowData)}
            />
        </div>
    );

    const rolBody = (rowData: Usuario) => (
        <div className="py-2 px-1">
            <Tag 
                value={rowData.rol || 'EMPLEADO'} 
                severity={rowData.rol === 'ADMIN' ? 'success' : 'info'} 
                className="px-3 py-1 uppercase text-xs font-bold tracking-wider"
            />
        </div>
    );

    const nombreCompletoBody = (rowData: Usuario) => (
        <div className="py-2 px-1">
            <span className="text-gray-600 font-semibold">{rowData.nombre_empleado}</span>
            <span className="text-gray-400 ml-1">{rowData.apellido_empleado}</span>
        </div>
    );

    return (
        <div className="p-3 md:p-6 lg:p-8 bg-gray-50 min-h-screen">
            <div className="max-w-7xl mx-auto">
                <div className="bg-white shadow-sm border border-gray-100 rounded-2xl overflow-hidden">
                    {/* Header de la Tabla con Aire */}
                    <div className="flex flex-col sm:flex-row justify-between items-center p-6 gap-4 border-b border-gray-50 bg-white">
                        <div className="flex items-center gap-3">
                            <div className="bg-blue-600 p-2 rounded-lg shadow-blue-200 shadow-lg">
                                <i className="pi pi-users text-white text-xl"></i>
                            </div>
                            <h2 className="text-xl md:text-2xl font-bold text-gray-800 m-0">
                                Gestión de Empleados
                            </h2>
                        </div>
                        <Button 
                            label="Nuevo Empleado" 
                            icon="pi pi-plus" 
                            className="w-full sm:w-auto p-button-primary px-6 py-3 font-bold rounded-xl shadow-md transition-all hover:translate-y-0.5" 
                            onClick={() => setShowDialog(true)} 
                        />
                    </div>

                    {/* Tabla con Responsive Scroll */}
                    <DataTable 
                        value={usuarios} 
                        loading={loading}
                        header={header}
                        globalFilter={globalFilter}
                        globalFilterFields={['usuario', 'nombre_empleado', 'apellido_empleado', 'rol']}
                        showGridlines 
                        paginator 
                        rows={5} 
                        responsiveLayout="stack" 
                        breakpoint="960px"
                        className="p-datatable-responsive-demo px-2"
                        rowClassName={() => 'border-b border-indigo-200 last:border-0'}
                        filters={{
                            'rol':{value: filtroRol, matchMode: 'equals'}
                        }}
                    >
                        <Column field="usuario" header="Usuario" body={usuarioBody} sortable className="min-w-37.5" />
                        <Column header="Nombre Completo" body={nombreCompletoBody} sortable className="min-w-50" />
                        <Column field="rol" header="Rol" body={rolBody} sortable className="min-w-30" />
                        <Column header="Estado de Cuenta" body={statusBody} className="w-37.5 text-center" />
                    </DataTable>
                </div>
            </div>

            {/* Diálogo de Creación con Padding */}
            <Dialog 
                header="Registrar Personal" 
                visible={showDialog}
                draggable={false}
                resizable={false} 
                onHide={() => setShowDialog(false)} 
                className="w-[95vw] md:w-125"
                contentClassName="p-6"
                headerClassName="p-6 border-b border-gray-100 text-gray-800 font-bold text-xl"
            >
                <div className="flex flex-col gap-6 mt-2">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <span className="p-float-label">
                            <InputText id="nom" className="w-full p-2 border border-gray-300 rounded-lg focus:border-blue-500 transition-all" value={nuevoEmpleado.nombre_empleado} onChange={(e) => setNuevoEmpleado({...nuevoEmpleado, nombre_empleado: e.target.value})} />
                            <label htmlFor="nom">Nombre</label>
                        </span>
                        <span className="p-float-label">
                            <InputText id="ape" className="w-full p-2 border border-gray-300 rounded-lg focus:border-blue-500 transition-all" value={nuevoEmpleado.apellido_empleado} onChange={(e) => setNuevoEmpleado({...nuevoEmpleado, apellido_empleado: e.target.value})} />
                            <label htmlFor="ape">Apellido</label>
                        </span>
                    </div>
                    <span className="p-float-label">
                        <InputText id="usr" className="w-full p-2 border border-gray-300 rounded-lg focus:border-blue-500 transition-all" value={nuevoEmpleado.usuario} onChange={(e) => setNuevoEmpleado({...nuevoEmpleado, usuario: e.target.value})} />
                        <label htmlFor="usr">Nombre de Usuario</label>
                    </span>
                    <span className="p-float-label">
                        <InputText id="pass" type="password" className="w-full p-2 border border-gray-300 rounded-lg focus:border-blue-500 transition-all" value={nuevoEmpleado.contraseña} onChange={(e) => setNuevoEmpleado({...nuevoEmpleado, contraseña: e.target.value})} />
                        <label htmlFor="pass">Contraseña Segura</label>
                    </span>
                    <Dropdown 
                        value={nuevoEmpleado.rol} 
                        options={roles} 
                        onChange={(e: DropdownChangeEvent) => setNuevoEmpleado({...nuevoEmpleado, rol: e.value})} 
                        className="w-full py-1"
                        placeholder="Asignar Rol"
                    />
                    <div className="flex justify-end gap-3 mt-4 pt-4 border-t border-gray-50">
                        <Button label="Cancelar" icon="pi pi-times" onClick={() => setShowDialog(false)} className="px-6 rounded-xl font-bold" severity="danger"/>
                        <Button label="Crear Empleado" icon="pi pi-check" onClick={guardarEmpleado} className="px-6 rounded-xl font-bold" severity="success" />
                    </div>
                </div>
            </Dialog>
        </div>
    );
}