
// Definimos los roles que ya tienes en tu Enum de Prisma
export type UserRole = "ADMIN" | "EMPLEADO";

export interface MenuItem {
    title: string;
    href: string;
    icon: string; // Clase de PrimeIcons (ej: 'pi pi-home')
    roles?: UserRole[]; // Si no se pone, todos lo ven. Si se pone, solo esos roles.
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
        roles: ["ADMIN"], // <--- Solo tú como Admin lo verás
    },
    {
        title: "Empleados",
        href: "/empleados",
        icon: "pi pi-users",
        roles: ["ADMIN"], // <--- Solo tú gestionas personal
    },
    {
        title: "Configuración",
        href: "/configuracion",
        icon: "pi pi-cog",
    },
];