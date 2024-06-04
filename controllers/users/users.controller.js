import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function create_user() {
    const { name, permissions } = req.body;
    await prisma.user.create({
        data: {
            name,
            permissions
        },
    });
}

export async function allUsers(req, res) {
    const users = await prisma.user.findMany();
    if (!users || users.length === 0) return res.status(404).send('No users found');

    return res.status(200).json(users);

}

export async function deleteUser(req, res) {
    const { id } = req.params;
    const user = prisma.user.findUnique(id);
    if (!user) return res.send('Ese usuario no existe');
}