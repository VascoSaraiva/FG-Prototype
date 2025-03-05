const catchAsync = require('../utils/catchAsync');
const callOpenAI = require('../utils/callOpenAI');
const initiativePrompts = require('../prompts/initiative.prompts');

const getInitiativeStructure = catchAsync(async (req, res) => {

    const { query } = req;

    const hasQuery = Object.keys(query).length > 0

    let customMessage = `Design an engaging educational activity based on the following parameters:`

    let customMessageProperties = `{
        ${query.typology ? `typology: ${query.typology}` : ''},
        ${query.objective ? `objective.verb ${query.objective.split(" ")[0]}` : ''},
        ${query.objective ? `objective.title ${query.objective}` : ''},
        ${query.areas ? `areas: [${query.areas}]` : ''},
        ${query.educationLevel ? `participants.educationLevel: ${query.educationLevel}` : ''},
        ${query.playerType ? `participants.playerType: ${query.playerType}` : ''},
    }`;

    if(hasQuery){
        initiativePrompts.structure.message = `${customMessage} ${customMessageProperties}`;
    }

    console.log(initiativePrompts.structure.message);

    const response = await callOpenAI(initiativePrompts.structure);
    res.status(200).json(JSON.parse(response));
});

module.exports = {
    getInitiativeStructure,
}

