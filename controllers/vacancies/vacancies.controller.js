import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function createVacancy(req, res) {
    const {
        vacancy_name,
        main_tech,
        experience_required_for_main_tech,
        second_tech,
        experience_required_for_second_tech,
        experience_level,
        vacancy_status,
        role,
        sale_rate,
        notes,
        client_id,
        start_date
    } = req.body;

    try {
        const newVacancy = await prisma.vacancy.create({
            data: {
                client: {
                    connect: {
                        id: client_id
                    }
                },
                vacancy_name,
                main_tech,
                experience_required_for_main_tech,
                second_tech,
                experience_required_for_second_tech,
                experience_level,
                vacancy_status,
                role,
                sale_rate,
                notes,
                start_date: new Date(start_date)
            }

        });

        if (!newVacancy) return res.send('No se pudo crear la vacante');

        return res.status(200).json(newVacancy);

    } catch (error) {

        console.error(error.message);
        return res.send('No se pudo crear la vacante');

    }

}

export async function allVacancies(req, res) {
    let { skip, take } = req.body;

    if (!skip) skip = 0;
    if (!take) take = 10;

    const vacancies = await prisma.vacancy.findMany({
        skip,
        take,
        orderBy: {
            created_at: 'asc'
        }
    });

    if (vacancies.length === 0) return res.status(404).send('No se encontraron vacantes');

    return res.status(200).json(vacancies);
}

export async function vacancyById(req, res) {
    const { id } = req.params;

    const vacancy = await prisma.vacancy.findUnique({
        where: { id },
        include: {
            client: true
        }
    });

    if (!vacancy) return res.send('No se encontró la vacante');

    return res.json(vacancy);
}

export async function updateVacancy(req, res) {

    try {

        const updatedVacancy = await prisma.vacancy.update({
            where: {
                id: req.params.id
            },
            data: req.body

        });

        if (!updatedVacancy) return res.send('No se pudo actualizar la vacante');

        return res.status(200).json(updatedVacancy);

    } catch (error) {
        console.error(error.message);
        return res.send('No se pudo actualizar la vacante');
    }

}

export async function deleteVacancy(req, res) {
    const { id } = req.params;

    const deletedVacancy = prisma.vacancy.delete({
        where: { id }
    });

    if (!deleteVacancy) return res.send('No se pudo eliminar la vacante');

    return res.json(deletedVacancy);
}