"use client";
import React, { useState, useRef } from 'react';
import { Toast } from 'primereact/toast';
import ProductTable, { ProductoBD } from '@/src/components/productos/product-table';

export default function ProductosPage() {
    const toast = useRef<Toast>(null);

    const [products] = useState<ProductoBD[]>([
        { 
            id_producto: 1, 
            codigo_barras: '779123456789', 
            nombre_producto: 'Coca Cola 2.25L', 
            nombre_marca: 'Coca Cola',
            descripcion: 'Gaseosa cola original',
            precio_venta: 2800, 
            cantidad_producto: 50, 
            stock_minimo: 10,
            nombre_categoria: 'Bebidas',
            activo: true
        },
        { 
            id_producto: 2, 
            codigo_barras: '779987654321', 
            nombre_producto: 'Galletas Oreo', 
            nombre_marca: 'Oreo',
            descripcion: 'Paquete x117g',
            precio_venta: 1500, 
            cantidad_producto: 5, 
            stock_minimo: 10,
            nombre_categoria: 'Almacén',
            activo: true
        },
        { 
            id_producto: 3, 
            codigo_barras: '779333333333', 
            nombre_producto: 'Leche', 
            nombre_marca: 'La Serenísima',
            descripcion: 'Descremada larga vida',
            precio_venta: 1900, 
            cantidad_producto: 0, 
            stock_minimo: 20,
            nombre_categoria: 'Lácteos',
            activo: true
        },
        { 
        id_producto: 4, 
        codigo_barras: '779052000050', 
        nombre_producto: 'Yerba Mate Playadito', 
        nombre_marca: 'Playadito',
        descripcion: 'Paquete 1kg',
        precio_venta: 4500, 
        cantidad_producto: 25, 
        stock_minimo: 5,
        nombre_categoria: 'Almacén',
        activo: true
    },
    { 
        id_producto: 5, 
        codigo_barras: '779004000030', 
        nombre_producto: 'Aceite de Girasol', 
        nombre_marca: 'Natura',
        descripcion: 'Botella 900ml',
        precio_venta: 2100, 
        cantidad_producto: 12, // Poco Stock
        stock_minimo: 10,
        nombre_categoria: 'Almacén',
        activo: true
    },
    { 
        id_producto: 6, 
        codigo_barras: '779023000010', 
        nombre_producto: 'Fideos Tallarines', 
        nombre_marca: 'Lucchetti',
        descripcion: 'Paquete 500g',
        precio_venta: 1100, 
        cantidad_producto: 45, 
        stock_minimo: 15,
        nombre_categoria: 'Almacén',
        activo: true
    },
    { 
        id_producto: 7, 
        codigo_barras: '779067000020', 
        nombre_producto: 'Detergente Limón', 
        nombre_marca: 'Magistral',
        descripcion: 'Botella 500ml',
        precio_venta: 1850, 
        cantidad_producto: 6, // Poco Stock
        stock_minimo: 5,
        nombre_categoria: 'Limpieza',
        activo: true
    },
    { 
        id_producto: 8, 
        codigo_barras: '779089000040', 
        nombre_producto: 'Jabón en Polvo Matic', 
        nombre_marca: 'Ala',
        descripcion: 'Bolsa 800g',
        precio_venta: 3200, 
        cantidad_producto: 0, // Agotado
        stock_minimo: 5,
        nombre_categoria: 'Limpieza',
        activo: true
    },
    { 
        id_producto: 9, 
        codigo_barras: '779011000090', 
        nombre_producto: 'Shampoo Reparación', 
        nombre_marca: 'Pantene',
        descripcion: 'Frasco 400ml',
        precio_venta: 5400, 
        cantidad_producto: 15, 
        stock_minimo: 3,
        nombre_categoria: 'Perfumería',
        activo: true
    },
    { 
        id_producto: 10, 
        codigo_barras: '779034000070', 
        nombre_producto: 'Cerveza Lata 473ml', 
        nombre_marca: 'Quilmes',
        descripcion: 'Clásica rubia',
        precio_venta: 1600, 
        cantidad_producto: 72, 
        stock_minimo: 24,
        nombre_categoria: 'Bebidas',
        activo: true
    },
    { 
        id_producto: 11, 
        codigo_barras: '779056000080', 
        nombre_producto: 'Agua Mineral s/gas', 
        nombre_marca: 'Eco de los Andes',
        descripcion: 'Botella 1.5L',
        precio_venta: 950, 
        cantidad_producto: 48, 
        stock_minimo: 12,
        nombre_categoria: 'Bebidas',
        activo: true
    },
    { 
        id_producto: 12, 
        codigo_barras: '779012000060', 
        nombre_producto: 'Arroz Largo Fino', 
        nombre_marca: 'Gallo',
        descripcion: 'Paquete 1kg',
        precio_venta: 2400, 
        cantidad_producto: 30, 
        stock_minimo: 10,
        nombre_categoria: 'Almacén',
        activo: true
    },
    { 
        id_producto: 13, 
        codigo_barras: '779078000030', 
        nombre_producto: 'Yogur de Vainilla', 
        nombre_marca: 'Yogs',
        descripcion: 'Sachet 1L',
        precio_venta: 1450, 
        cantidad_producto: 4, // Poco Stock
        stock_minimo: 10,
        nombre_categoria: 'Lácteos',
        activo: true
    },
    { 
        id_producto: 14, 
        codigo_barras: '779021000010', 
        nombre_producto: 'Papas Fritas Original', 
        nombre_marca: 'Lay\'s',
        descripcion: 'Paquete 150g',
        precio_venta: 2200, 
        cantidad_producto: 20, 
        stock_minimo: 5,
        nombre_categoria: 'Snacks',
        activo: true
    },
    { 
        id_producto: 15, 
        codigo_barras: '779045000020', 
        nombre_producto: 'Alfajor Triple', 
        nombre_marca: 'Fantoche',
        descripcion: 'Chocolate negro 85g',
        precio_venta: 850, 
        cantidad_producto: 36, 
        stock_minimo: 12,
        nombre_categoria: 'Golosinas',
        activo: true
    }
    ]);

    const handleNewProduct = () => {
        toast.current?.show({severity:'info', summary:'Nuevo Producto', detail:'Cargando formulario...'});
    };

    return (
        <div className="w-full">
            <Toast ref={toast} />
            {/* Directamente el componente para que use el ancho del layout */}
            <ProductTable products={products} onNew={handleNewProduct} />
        </div>
    );
}