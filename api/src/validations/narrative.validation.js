const { z } = require('zod');

const getNarrativeIngredients = {
    query: z.object({
        typology: z.string(),
        areas: z.string(),
        educationLevel: z.string(),
        objective: z.string(),
        playerType: z.enum(['Killer', 'Achiever', 'Explorer', 'Socializer'])
    }),
}

module.exports = {
    getNarrativeIngredients,
};