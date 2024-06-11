import express from 'express';
const vacanciesRouter = express.Router();

import * as vacanciesController from '../controllers/vacancies/vacancies.controller.js';

vacanciesRouter.post('', vacanciesController.createVacancy);
vacanciesRouter.get('/specs', vacanciesController.vacanciesSpecs);

vacanciesRouter.post('/obtainData', vacanciesController.allVacancies);
vacanciesRouter.get('/obtainInProcess', vacanciesController.VacantsInProcess);
vacanciesRouter.get('/obtainAvailable', vacanciesController.VacantsAvailable);
vacanciesRouter.get('/obtainTaken', vacanciesController.VacantsTaken);
vacanciesRouter.get('/obtainJR', vacanciesController.VacantsJR);
vacanciesRouter.get('/obtainMID', vacanciesController.VacantsMID);
vacanciesRouter.get('/obtainSR', vacanciesController.VacantsSR);
vacanciesRouter.get('/main_tech', vacanciesController.main_tech);
vacanciesRouter.get('/second_tech', vacanciesController.second_tech);

vacanciesRouter.get('/:id', vacanciesController.vacancyById);
vacanciesRouter.put('/:id', vacanciesController.updateVacancy);
vacanciesRouter.delete('/:id', vacanciesController.deleteVacancy);

export default vacanciesRouter;