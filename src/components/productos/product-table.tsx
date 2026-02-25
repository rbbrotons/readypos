"use client";
import React, { useState } from 'react';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { DataTable, DataTableFilterMeta, DataTableFilterMetaData } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import { Button } from 'primereact/button';
import { Tag } from 'primereact/tag';
import { Toolbar } from 'primereact/toolbar';

export interface ProductoBD {
    id_producto: number;
    codigo_barras: string;
    nombre_producto: string;
    descripcion: string;
    precio_venta: number;
    cantidad_producto: number;
    stock_minimo: number;
    nombre_categoria: string;
    nombre_marca: string;
    activo: boolean;
}

interface ProductTableProps {
    products: ProductoBD[];
    onNew: () => void;
}

export default function ProductTable({ products, onNew }: ProductTableProps) {
    const [filters, setFilters] = useState<DataTableFilterMeta>({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        nombre_producto: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        nombre_marca: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
    });
    
    const [globalFilterValue, setGlobalFilterValue] = useState<string>('');

    const onGlobalFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        const _filters = { ...filters };
        const globalFilter = _filters['global'] as DataTableFilterMetaData;
        globalFilter.value = value;
        setFilters(_filters);
        setGlobalFilterValue(value);
    };

    const priceBodyTemplate = (rowData: ProductoBD) => {
        return new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(rowData.precio_venta);
    };

    const statusBodyTemplate = (rowData: ProductoBD) => {
        const stock = rowData.cantidad_producto;
        const min = rowData.stock_minimo;
        if (stock === 0) return <Tag value="Agotado" severity="danger" />;
        if (stock <= min) return <Tag value="Poco Stock" severity="warning" />;
        return <Tag value="En Stock" severity="success" />;
    };

    // --- MEJORA DEL HEADER ---
    // Agregamos el botón de "Limpiar" a la izquierda del buscador para copiar el estilo PrimeReact
    const header = (
        <div className="flex justify-between align-items-center gap-2 py-2 px-1">
            {/* Botón de limpiar igual al de la imagen de referencia */}
            <Button 
                type="button" 
                icon="pi pi-filter-slash" 
                label="Limpiar" 
                outlined 
                className="p-button-sm text-xs font-semibold"
                onClick={() => {
                    setGlobalFilterValue('');
                    const _filters = { ...filters };
                    ( _filters['global'] as DataTableFilterMetaData).value = null;
                    setFilters(_filters);
                }} 
            />

            {/* Este bloque recrea exactamente el buscador de PrimeReact */}
            <IconField iconPosition="left">
                <InputIcon className="pi pi-search text-gray-400" /> 
                <InputText 
                    value={globalFilterValue} 
                    onChange={onGlobalFilterChange} 
                    placeholder="Búsqueda rápida..." 
                    className="p-inputtext-sm border-gray-300 hover:border-blue-400 transition-colors duration-200" 
                    style={{ 
                        width: '240px', 
                        borderRadius: '6px', // Esquinas redondeadas suaves como en la web oficial
                        fontSize: '0.875rem' 
                    }}
                />
            </IconField>
        </div>
    );

    return (
        <div className="w-full">
            {/* Agregamos una sombra más profunda y bordes definidos */}
            <div className="card shadow-5 border-round-xl bg-white overflow-hidden border border-gray-200">
                
                <Toolbar 
                    className="bg-gray-50 border-none px-4 py-3" 
                    start={<Button label="Nuevo Producto" icon="pi pi-plus" severity="success" onClick={onNew} raised className="px-4" />} 
                />
                
                <DataTable 
                    value={products} 
                    paginator 
                    showGridlines // Líneas divisorias como en el ejemplo avanzado
                    rows={10} 
                    rowsPerPageOptions={[5, 10, 25, 50]}
                    dataKey="id_producto" 
                    filters={filters} 
                    filterDisplay="menu" 
                    globalFilterFields={['nombre_producto', 'codigo_barras', 'nombre_categoria', 'nombre_marca']} 
                    header={header} 
                    emptyMessage="No se encontraron productos."
                    responsiveLayout="scroll" // Permite el deslizamiento lateral en móviles
                    size="large" // Filas más altas para que respiren
                    stripedRows
                    className="p-datatable-customers"
                    pt={{
                        header: { className: 'bg-white border-none pb-4' },
                        thead: { className: 'text-gray-600 uppercase text-xs font-bold' },
                        bodyRow: { className: 'h-4rem md:h-5rem' } // Fila más grande en PC
                    }}
                >
                    {/* 1. CÓDIGO: Solo visible en PC (Desktop) */}
                    <Column 
                        field="codigo_barras" 
                        header="Código" 
                        filter 
                        className="hidden lg:table-cell px-4 py-3" 
                    />

                    {/* 2. PRODUCTO: Siempre visible (Prioridad Móvil) */}
                    <Column 
                        field="nombre_producto" 
                        header="Producto" 
                        filter 
                        sortable 
                        className="font-bold px-4 py-3 text-gray-800" 
                        style={{ minWidth: '12rem' }} 
                    />

                    {/* 3. MARCA: Siempre visible (Prioridad Móvil) */}
                    <Column 
                        field="nombre_marca" 
                        header="Marca" 
                        filter 
                        sortable 
                        className="px-4 py-3" 
                    />

                    {/* 4. CATEGORÍA: Oculta en móviles, aparece desde tablets (md) */}
                    <Column 
                        field="nombre_categoria" 
                        header="Categoría" 
                        className="hidden md:table-cell px-4 py-3" 
                    />

                    {/* 5. ESTADO/STOCK: Siempre visible (Prioridad Móvil) */}
                    <Column 
                        field="estado" 
                        header="Estado" 
                        body={statusBodyTemplate} 
                        className="px-4 py-3 text-center" 
                        style={{ minWidth: '8rem' }} 
                    />

                    {/* 6. PRECIO: Movido a la derecha. Oculto en móvil (se verá en el ojito) */}
                    <Column 
                        field="precio_venta" 
                        header="Precio" 
                        body={priceBodyTemplate} 
                        sortable 
                        className="hidden md:table-cell px-4 py-3 text-green-700 font-bold text-right" 
                    />

                    {/* 7. ACCIONES: Adaptable según pantalla */}
                    <Column 
                        header="Acciones"
                        className="px-2 py-3"
                        body={(rowData) => (
                            <div className="flex gap-2 justify-content-center">
                                {/* Ojito: Solo visible en móviles (hidden en md+) */}
                                <Button 
                                    icon="pi pi-eye" 
                                    rounded 
                                    text 
                                    severity="secondary" 
                                    className="md:hidden" 
                                    onClick={() => console.log('Detalle del producto:', rowData)}
                                    tooltip="Ver detalles"
                                />
                                
                                {/* Lápiz y Basura: Solo en PC/Tablets (hidden en móvil) */}
                                <Button 
                                    icon="pi pi-pencil" 
                                    rounded 
                                    text 
                                    severity="info" 
                                    className="hidden md:inline-flex" 
                                    tooltip="Editar"
                                />
                                <Button 
                                    icon="pi pi-trash" 
                                    rounded 
                                    text 
                                    severity="danger" 
                                    className="hidden md:inline-flex" 
                                    tooltip="Eliminar"
                                />
                            </div>
                        )} 
                        style={{ width: '8rem' }} 
                    />
                </DataTable>
            </div>
        </div>
    );
}