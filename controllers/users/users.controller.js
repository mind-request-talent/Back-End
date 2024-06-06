import { PrismaClient } from "@prisma/client";
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export async function createUser(req, res) {
    const { name, email, password, permissions } = req.body;
    const salt = bcrypt.genSaltSync(12);
    const hash = bcrypt.hashSync(password, salt);

    try {
        const newUser = await prisma.user.create({
            data: {
                name,
                email,
                password: hash,
                permissions
            },
        });

        if (!newUser) return res.send('No se pudo crear el usuario');

    } catch (error) {
        console.error(error.message);
        return res.send('No se pudo crear el usuario');
    }

    return res.json(newUser);
}

export async function allUsers(req, res) {
    let { skip, take } = req.params;
    if (!skip) skip = 0;
    if (!take) take = 10;

    try {

        const users = await prisma.user.findMany({ skip, take });
        if (!users || users.length === 0) return res.status(404).send('No se encontraron usuarios');

    } catch (error) {
        console.error(error);
        res.send('Ocurrió un error en la revisión')
    }

    return res.status(200).json(users);

}

export async function userById(req, res) {
    const { id } = req.params;
    const user = await prisma.user.findUnique({
        where: { id }
    });
    if (!user) return res.status(404).json(user);

    return res.status(200).json(user);
}

export async function updateUser(req, res) {
    const { id } = req.params;
    const changes = req.body;
    const updatedUser = await prisma.user.update({
        where: { id },
        data: {
            changes
        }
    });

    if (!updatedUser) return res.send('No se pudo actualizar el usuario');

    return res.status(200).json(updatedUser);
}

export async function deleteUser(req, res) {
    const { id } = req.params;
    const user = prisma.user.findUnique({
        where: { id }
    });
    if (!user) return res.send('Ese usuario no existe');

    await prisma.user.delete({
        where: { id }
    });
}

export async function login(req, res) {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({
        where: { email }
    });

    if (!user) throw new Error('Usuario o contraseña incorrecta');

    const storedPass = user.password;

    const login = bcrypt.compareSync(password, storedPass);

    if (!login) throw new Error('Usuario o contraseña incorrecta');

    return res.status(200).json({
        message: `Bienvenido ${user.name}`,
        user: {
            id: user.id,
            name: user.name,
            email: user.email
        }
    });
}