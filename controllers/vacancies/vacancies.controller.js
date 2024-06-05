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
        client_id,
        start_date
    } = req.body;

    const newVacancy = await prisma.vacancy.create({
        data: {
            vacancy_name,
            main_tech,
            experience_required_for_main_tech,
            second_tech,
            experience_required_for_second_tech,
            experience_level,
            vacancy_status,
            role,
            sale_rate,
            client_id,
            start_date
        }
    });

    if (!newVacancy) return res.send('No se pudo crear la vacante');

    return res.status(200).json(newVacancy);
}

export async function allVacancies(req, res) {
    let { skip, take } = req.body;

    if (!skip) skip = 0;
    if (!take) take = 10;

    const vacancies = await prisma.vacancy.findMany({
        skip,
        take
    });

    if (vacancies.length === 0) return res.status(404).send('No se encontraron vacantes');

    return res.status(200).json(vacancies);
}

export async function vacancyById(req, res) {
    const { id } = req.params;

    const vacancy = await prisma.vacancy.findUnique({
        where: { id }
    });

    if (!vacancy) return res.send('No se encontró la vacante');

    return res.json(vacancy);
}

export async function updateVacancy(req, res) {
    const { id } = req.params;
    const changes = req.body;

    const updatedVacancy = await prisma.vacancy.update({
        where: { id },
        data: {
            changes
        }
    });

    if (!updatedVacancy) return res.send('No se pudo actualizar la vacante');

    return res.json(updateVacancy);
}

export async function deleteVacancy(req, res) {
    const { id } = req.params;

    const deletedVacancy = prisma.vacancy.delete({
        where: { id }
    });

    if (!deleteVacancy) return res.send('No se pudo eliminar la vacante');

    return res.json(deletedVacancy);
}