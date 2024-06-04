import express from 'express';
import bodyparser from 'body-parser';
import cookieParser from 'cookie-parser';

import router from './routes/main.routes.js';
import usersRouter from './routes/users.routes.js';

const app = express();

app.use(cookieParser());
app.use(bodyparser.json());

app.use('', router);
app.use('/users/', usersRouter);

export default app;