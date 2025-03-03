const dotenv = require('dotenv');
const path = require('path');
const { z } = require('zod');
const ApiError = require('../utils/ApiError');
const { status } = require('http-status');

dotenv.config({ path: path.join(__dirname, '../../.env') });

const envVarsSchema = z.object({
    PORT: z.string().default('3000'),
    NODE_ENV: z.enum(['production', 'development']),
    MONGO_URL: z.string(),
    GITHUB_TOKEN: z.string(),
    AZURE_ENDPOINT: z.string(),
}).passthrough();

// Zod validates process.env against envVarsSchema. Throws an error if the validation fails.
const { data, success, error } = envVarsSchema.safeParse(process.env);

if (error) {
    throw new ApiError(status.INTERNAL_SERVER_ERROR, 'Invalid environment variables', { errors: error.errors });
}

module.exports = {
    port: data.PORT,
    env: data.NODE_ENV,
    AI: {
        token: data.GITHUB_TOKEN,
        endpoint: data.AZURE_ENDPOINT,
        defaultOptions: {
            temperature: 1,
            top_p: 1.0,
            max_tokens: 5000,
            model: 'gpt-4o-mini',
        }
    },
    mongoose: {
        url: data.MONGO_URL,
        options: {
            serverSelectionTimeoutMS: 5000 // Timeout for trying to establish a connection to the MongoDB server
        },
    },
}