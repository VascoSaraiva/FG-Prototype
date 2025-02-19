const config = require('../config/config');
const OpenAI = require('openai');

const {
    endpoint,
    token,
    options,
} = config.ai

const client = new OpenAI({
    baseUrl: endpoint,
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
        topP: options.topP,
        maxTokens: options.maxTokens,
        model: options.modelName,
    })

    console.log(response)
    return response.choices[0].message.content;
}

module.exports = callOpenAI