const dotenv = require('dotenv');
const path = require('path');
const Joi = require('joi');

dotenv.config({ path: path.join(__dirname, '../../.env') });

const envVarsSchema = Joi.object({
    PORT: Joi.number().default(3000),
    NODE_ENV: Joi.string().valid('production', 'development').required(),
    MONGO_URL: Joi.string().required().description('Mongo DB url'),
    GITHUB_TOKEN: Joi.string().required().description('Github token'),
    AZURE_ENDPOINT: Joi.string().required().description('Azure endpoint'),
}).unknown();

// Joi validates process.env against envVarsSchema.
const { value: envVars, error } = envVarsSchema.prefs({ errors: { label: 'key' } }).validate(process.env);

// Prevents running the app with a misconfigured environment.
if (error) {
    throw new Error(`Config validation error: ${error.message}`);
}

module.exports = {
    port: envVars.PORT,
    env: envVars.NODE_ENV,
    ai: {
        token: envVars.GITHUB_TOKEN,
        endpoint: envVars.AZURE_ENDPOINT,
        options: {
            temperature: 1.0,
            topP: 1.0,
            maxTokens: 1000,
            modelName: 'gpt-4o-mini',
        }
    },
    mongoose: {
        url: envVars.MONGO_URL,
        options: {},
    },
}