import express from 'express';
const usersRouter = express.Router();

import * as usersController from '../controllers/users/users.controller.js';

usersRouter.post('', usersController.createUser);
usersRouter.get('', usersController.allUsers);
usersRouter.get('/:id', usersController.userById);
usersRouter.put('/:id', usersController.updateUser);
usersRouter.delete('/:id', usersController.deleteUser);


export default usersRouter;