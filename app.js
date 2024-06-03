const express = require('express')

const router = require('./routes/main.routes')

const app = express();
app.use('', router);

module.exports = app;