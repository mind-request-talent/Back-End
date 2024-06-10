import express from 'express';
const clientsRouter = express.Router();

import * as clientController from '../controllers/clients/clients.controller.js';

clientsRouter.post('', clientController.createClient);
clientsRouter.get('', clientController.allClients);
clientsRouter.get('/:id', clientController.clientById);
clientsRouter.post('/byEmail', clientController.clientByEmail);
clientsRouter.put('/:id', clientController.updateClient);
clientsRouter.delete('/:id', clientController.deleteUser);

export default clientsRouter;