const config = require('../config/config');
const OpenAI = require('openai');

const {
    endpoint,
    token,
    options,
} = config.ai

const client = new OpenAI({
    baseURL: endpoint,
    apiKey: token,
});

/**
 * 
 * @param {string} system  - The system prompt to send to the OpenAI model.
 * @param {string} message - The user message to send to the OpenAI model.
 * @returns 
 */
async function callOpenAI(system, message) {
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
        temperature: options.temperature,
        top_p: options.topP,
        max_tokens: options.maxTokens,
        model: options.modelName,
    })

    return response.choices[0].message.content;
}

module.exports = callOpenAI