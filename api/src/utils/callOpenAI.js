const config = require('../config/config');
const OpenAI = require('openai');
const ApiError = require('../utils/ApiError');

const {
    endpoint,
    token,
    defaultOptions
} = config.AI

const client = new OpenAI({
    baseURL: endpoint,
    apiKey: token,
});


/**
 * Calls the OpenAI API to generate a response.
 * @param {string} system - The system prompt.
 * @param {string} message - The user prompt.
 * @param {string} format - The response format for the message.
 * @param {object} options - The API options.
 * @returns {Promise<string>} The response from the API.
 */
async function callOpenAI({ system, message, format, options = defaultOptions }) {
    const completion = await client.chat.completions.create({
        messages: [
            {
                role: 'system',
                content: system,
            },
            {
                role: 'user',
                content: message,
            },
        ],
        response_format: format,
        ...options
    });

    console.log(completion.choices[0].message)

    return completion.choices[0].message.content;
}

module.exports = callOpenAI