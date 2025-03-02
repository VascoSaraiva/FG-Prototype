class ApiError extends Error {
  constructor(statusCode, message, data = {}, isOperational = true) {
    super(message);
    this.statusCode = statusCode;
    this.data = data;
    this.isOperational = isOperational;
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = ApiError;