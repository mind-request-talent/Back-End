import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

module.exports.create_user = async (req, res) => {
    const { name, permissions } = req.body;
    await prisma.user.create({
        data: {
            name,
            permissions
        },
    });
}

module.exports.all_users = async (req, res) => {
    const users = await prisma.user.findMany()
    if (!users) return res.status(404).send('No users found')

    return res.status(200).json(users);

}