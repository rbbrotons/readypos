//import { UserRole } from "@/types/auth"; // Si no tienes tipos aún, puedes borrar esto por ahora

export interface MenuItem {
    title: string;
    href: string;
    icon: string; // Clase de PrimeIcons (ej: 'pi pi-home')
}

// Aquí está tu lista maestra.
// Si mañana quieres cambiar "Nueva Venta" por "Facturación", solo tocas aquí.
    export const menuItems: MenuItem[] = [
    {
        title: "Dashboard",
        href: "/dashboard",
        icon: "pi pi-th-large",
    },
    {
        title: "Ventas",
        href: "/venta",
        icon: "pi pi-shopping-cart",
    },
    {
        title: "Inventario",
        href: "/productos",
        icon: "pi pi-box",
    },
    {
        title: "Reportes",
        href: "/reportes",
        icon: "pi pi-chart-bar",
    },
    {
        title: "Empleados",
        href: "/empleados",
        icon: "pi pi-users",
    },
    {
        title: "Configuración",
        href: "/configuracion",
        icon: "pi pi-cog",
    },
];