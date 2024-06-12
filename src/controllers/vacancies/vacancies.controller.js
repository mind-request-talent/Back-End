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
    let { skip, take, order } = req.body;

    if (!skip) skip = 0;
    if (!take) take = 10;
    if (!order) order = 'desc'

    const vacancies = await prisma.vacancy.findMany({
        skip,
        take,
        orderBy: {
            created_at: `${order}`
        }
    });

    if (vacancies.length === 0) return res.status(404).send('No se encontraron vacantes');

    return res.status(200).json(vacancies);
}

export async function vacanciesSpecs(req, res) {
    const vacancies = await prisma.vacancy.findMany({
        select: {
            main_tech: true,
            second_tech: true,
            vacancy_status: true,
            experience_level: true,
        }
    });

    if (vacancies.length === 0) return res.status(404).send('No se encontraron vacantes');

    const taken = vacancies.filter(vacancies => { return vacancies.vacancy_status === 'TAKEN' });
    const available = vacancies.filter(vacancies => { return vacancies.vacancy_status === 'AVAILABLE' });
    const inProcess = vacancies.filter(vacancies => { return vacancies.vacancy_status === 'IN_PROCESS' });

    const jr = vacancies.filter(vacancies => { return vacancies.experience_level === 'JR' });
    const mid = vacancies.filter(vacancies => { return vacancies.experience_level === 'MID' });
    const sr = vacancies.filter(vacancies => { return vacancies.experience_level === 'SR' });

    //MT stands for main tech
    //ST stands for second tech
    const mtCounts = {};
    const stCounts = {};

    for (let vacancy of vacancies) {
        mtCounts[vacancy.second_tech] = (mtCounts[vacancy.second_tech] || 0) + 1;
        stCounts[vacancy.main_tech] = (stCounts[vacancy.main_tech] || 0) + 1;
    }

    const maxCountMT = Math.max(...Object.values(mtCounts));
    const maxCountST = Math.max(...Object.values(stCounts));
    const mostFrequentMT = Object.keys(mtCounts).find(key => mtCounts[key] === maxCountMT);
    const mostFrequentST = Object.keys(stCounts).find(key => stCounts[key] === maxCountST);

    // console.log(mostFrequentMT, maxCountMT);
    // console.log(mostFrequentST, maxCountST);

    res.status(200).json({
        taken_vacancies: taken.length,
        available_vacancies: available.length,
        in_process_vacancies: inProcess.length,
        jr_vacancies: jr.length,
        mid_vacancies: mid.length,
        sr_vacancies: sr.length,
        most_frequent_main_tech: mostFrequentMT,
        most_frequent_second_tech: mostFrequentST
    });
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