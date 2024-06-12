import express from 'express';
const vacanciesRouter = express.Router();

import * as vacanciesController from '../controllers/vacancies/vacancies.controller.js';

vacanciesRouter.post('', vacanciesController.createVacancy);

vacanciesRouter.get('', vacanciesController.allVacancies);
vacanciesRouter.get('/specs', vacanciesController.vacanciesSpecs);
vacanciesRouter.get('/:id', vacanciesController.vacancyById);

vacanciesRouter.put('/:id', vacanciesController.updateVacancy);

vacanciesRouter.delete('/:id', vacanciesController.deleteVacancy);

export default vacanciesRouter;