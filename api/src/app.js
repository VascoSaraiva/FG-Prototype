
const dotenv = require('dotenv');
const express = require('express');
const helmet = require('helmet');
const xss = require('xss-clean');
const mongoSanitize = require('express-mongo-sanitize');
const cors = require('cors');
const ApiError = require('./utils/ApiError');
const routes = require('./routes');
const { status } = require("http-status");
const { errorHandler } = require('./middlewares/error');

dotenv.config();

const app = express()

// set security HTTP headers
app.use(helmet());

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// sanitize request data
app.use(xss());
app.use(mongoSanitize());

// enable cors
app.use(cors());
app.options('*', cors());

app.use('/api', routes);

// 404 error for any unknown api request
app.use((req, res, next) => {
    next(new ApiError(status.NOT_FOUND, status[status.NOT_FOUND], 'Not Found'));
});

// error sanitizer
app.use(errorHandler);

module.exports = app;
