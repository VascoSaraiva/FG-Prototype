const config = require('../config/config');
const OpenAI = require('openai');

const {
    endpoint,
    token
} = config.AI

const client = new OpenAI({
    baseURL: endpoint,
    apiKey: token,
});

const defaultOptions = {
    temperature: 1.15,
    top_p: 1.0,
    max_tokens: 1000,
    modelName: 'gpt-4o-mini',
}

/**
 * Calls the OpenAI API to generate a response.
 * @param {string} system - The system prompt.
 * @param {string} message - The user prompt.
 * @param {string} format - The response format for the message.
 * @param {object} options - The API options.
 * @returns {Promise<string>} The response from the API.
 */
async function callOpenAI({ system, message, format, options = defaultOptions }) {
    const response = await client.chat.completions.create({
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
    })

    return response.choices[0].message.content;
}

module.exports = callOpenAI