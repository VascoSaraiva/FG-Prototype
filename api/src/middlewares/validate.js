const { z } = require('zod');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const { status } = require('http-status');

const validate = (schema) => (req, res, next) => {

  // Pick keys (params, query, body) from the schema and the request
  const validSchema = pick(schema, ['params', 'query', 'body']);
  const object = pick(req, Object.keys(validSchema));
  const combinedSchema = z.object(validSchema);

  // Validate using safeParse which collects all errors by default
  const result = combinedSchema.safeParse(object);

  if (!result.success) {
    return next(new ApiError(status.BAD_REQUEST, 'Invalid property', { errors: result.error.errors }));
  }

  // Merge validated values back into req
  Object.assign(req, result.data);
  return next();
};

module.exports = validate;
