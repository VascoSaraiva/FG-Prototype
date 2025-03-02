const config = require('../config/config');
const { status } = require("http-status");

const errorHandler = (err, req, res, next) => {
   
    let statusCode = err.statusCode || status.INTERNAL_SERVER_ERROR;
    let message = err.message || status[status.INTERNAL_SERVER_ERROR];
    let stack = err.stack || '';
    let data = err.data || {};

    if (config.env === 'production' && !err.isOperational) {
        statusCode = status.INTERNAL_SERVER_ERROR;
        message = status[status.INTERNAL_SERVER_ERROR];
    }

    const response = {
        message,
        ...(Object.keys(data).length > 0 && { details: data }),
    };

    if (config.env === 'development') {
        // response.stack = stack;
        console.error(err);
    }


    res.status(statusCode).send(response);

};

module.exports = {
    errorHandler
}