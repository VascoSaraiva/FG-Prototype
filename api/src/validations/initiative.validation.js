const { z } = require('zod');

const getInitiativeStructure = {
  query: z.object({
    typology: z.string().optional(),
    area: z.string().optional(),
    education: z.string().optional(),
    objective: z.string().optional(),
    player: z.enum(['Killer', 'Achiever', 'Explorer', 'Socializer']).optional()
  }),
};

module.exports = {
    getInitiativeStructure,
};
