import { NextResponse } from "next/server";
import prisma from "@/src/lib/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(request: Request) {
    try {
        const { usuario, contraseña } = await request.json();

        const JWT_SECRET = process.env.JWT_SECRET;
            if (!JWT_SECRET) {
                console.error("ERROR: JWT_SECRET no está definido en el .env");
                return NextResponse.json(
                    { message: "Error de configuración del servidor." }, 
                    { status: 500 }
                );
            }

        // 1. Buscar al usuario en Railway usando el nombre de usuario
        const userFound = await prisma.usuario.findFirst({
            where: { usuario: usuario }
        });

        // 2. Si no existe, devolvemos un 401 (No autorizado)
        if (!userFound) {
            return NextResponse.json(
                { message: "El usuario no existe en el sistema." }, 
                { status: 401 }
            );
        }

        // 3. Verificar contraseña
        // Por ahora comparamos texto plano porque así lo precargamos en pgAdmin.
        // En el siguiente paso te enseñaré a encriptarlas con bcrypt.
        const isMatch = contraseña === userFound.contrase_a;

        if (!isMatch) {
            return NextResponse.json(
                { message: "La contraseña es incorrecta." }, 
                { status: 401 }
            );
        }

        // 4. Generar el JWT (La pulsera de acceso)
        // Guardamos el ID, el Rol (ADMIN/EMPLEADO) y el nombre para el menú
        const token = jwt.sign(
            { 
                id_usuario: userFound.id_usuario, 
                rol: userFound.rol,
                nombre: userFound.nombre_empleado 
            },
            JWT_SECRET,
            { expiresIn: "12h" } // El token dura medio día (un turno largo)
        );

        // 5. Enviar respuesta exitosa
        return NextResponse.json({
            message: "Bienvenido a Almacén Mili",
            token,
            user: {
                id: userFound.id_usuario,
                usuario: userFound.usuario,
                rol: userFound.rol,
                nombre: userFound.nombre_empleado
            }
        });

    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { message: "Hubo un problema en el servidor." }, 
            { status: 500 }
        );
    }
}