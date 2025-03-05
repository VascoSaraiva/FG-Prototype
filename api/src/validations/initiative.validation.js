const { z } = require('zod');

const getInitiativeStructure = {
  query: z.object({
    typology: z.string().optional(),
    areas: z.string().optional(),
    educationLevel: z.string().optional(),
    objective: z.string().optional(),
    playerType: z.enum(['Killer', 'Achiever', 'Explorer', 'Socializer']).optional()
  }),
};

module.exports = {
    getInitiativeStructure,
};
