import { NextResponse } from 'next/server';
import prisma from '@/src/lib/prisma'; // Asegurate de tener tu instancia de Prisma aquí

// Obtener todos los usuarios
export async function GET() {
    try {
        const usuarios = await prisma.usuario.findMany({
            orderBy: { id_usuario: 'asc' }
        });
        return NextResponse.json(usuarios);
    } catch (error) {
        console.error("Error detallado:", error);
        return NextResponse.json({ error: 'Error al obtener usuarios' }, { status: 500 });
    }
}

// Actualizar el estado 'activo'
export async function PATCH(request: Request) {
    try {
        const { id_usuario, activo } = await request.json();
        const usuarioActualizado = await prisma.usuario.update({
            where: { id_usuario },
            data: { activo }
        });
        return NextResponse.json(usuarioActualizado);
    } catch (error) {
        console.error("Error detallado:", error);
        return NextResponse.json({ error: 'Error al actualizar estado' }, { status: 500 });
    }
}

// crear un nuevo usuario
export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { nombre_empleado, apellido_empleado, usuario, contraseña, rol } = body;
        // si no viene rol, por defecto es EMPLEADO
        // Pero si viene, va el del dropdown
        const rolAsignado = rol ? rol.toUpperCase() : 'EMPLEADO';
        const nuevoUsuario = await prisma.usuario.create({
            data: {
                nombre_empleado,
                apellido_empleado,
                usuario,
                contrase_a: contraseña, // Recordá que en tu modelo es 'contraseña' con @map
                rol: rolAsignado,
                activo: true
            }
        });
        return NextResponse.json(nuevoUsuario);
    } catch (error) {
        console.error("Error detallado:", error);
        return NextResponse.json({ error: 'Error al crear el empleado' }, { status: 500 });
    }
}