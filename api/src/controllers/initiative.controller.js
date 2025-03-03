const catchAsync = require('../utils/catchAsync');
const callOpenAI = require('../utils/callOpenAI');
const initiativePrompts = require('../prompts/initiative.prompts');

const getInitiativeStructure = catchAsync(async (req, res) => {
    const response = await callOpenAI(initiativePrompts.structure);
    res.status(200).json(JSON.parse(response));
});


module.exports = {
    getInitiativeStructure,
}

