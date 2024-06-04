import express from 'express';
const usersRouter = express.Router();

import * as usersController from '../controllers/users/users.controller.js';

usersRouter.get('/all', usersController.allUsers);
usersRouter.post('', usersController.create_user);


export default usersRouter;