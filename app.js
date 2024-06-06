import cors from 'cors';
import express from 'express';
import bodyparser from 'body-parser';
import cookieParser from 'cookie-parser';

import router from './routes/main.routes.js';
import usersRouter from './routes/users.routes.js';
import clientsRouter from './routes/clients.routes.js';
import vacanciesRouter from './routes/vacancies.routes.js';

const app = express();

app.use(cors());
app.use(cookieParser());
app.use(bodyparser.json());

app.use('', router);
app.use('/users/', usersRouter);
app.use('/clients/', clientsRouter);
app.use('/vacancies/', vacanciesRouter)

export default app;