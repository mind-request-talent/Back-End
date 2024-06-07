import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


export async function createClient(req, res) {
    const { name, email, phone } = req.body;

    const newClient = await prisma.client.create({
        data: {
            name,
            email,
            phone
        }
    });

    if (!newClient) return res.send('No se pudo crear el cliente');

    return res.status(200).json(newClient);
}

export async function allClients(req, res) {
    let { skip, take } = req.body;

    if (!skip) skip = 0;
    if (!take) take = 10;

    const clients = await prisma.client.findMany({
        skip,
        take
    });

    if (clients.length === 0) return res.status(404).send('No se encontraron clientes');

    return res.status(200).json(clients);
}

export async function clientById(req, res) {
    const { id } = req.params;

    const client = await prisma.client.findUnique({
        where: { id },
        include: {
            Vacancies: true
        }
    });

    if (!client) return res.send('No se encontró al cliente');

    return res.json(client);
}

export async function clientByEmail(req, res) {
    const { email } = req.body;

    const client = await prisma.client.findUnique({
        where: { email }
    });

    if (!client) return res.send('No se encontró el cliente');

    return res.json(client);
}

export async function updateClient(req, res) {
    const { id } = req.params;
    const changes = req.body;

    const updatedClient = await prisma.client.update({
        where: { id },
        data: {
            changes
        }
    });

    if (!updatedClient) return res.send('No se pudo actualizar el cliente');

    return res.json(updateClient);
}

export async function deleteUser(req, res) {
    const { id } = req.params

    await prisma.client.delete({
        where: { id }
    });


}