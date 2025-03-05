const catchAsync = require('../utils/catchAsync');
const callOpenAI = require('../utils/callOpenAI');
const initiativePrompts = require('../prompts/initiative.prompts');

const getInitiativeStructure = catchAsync(async (req, res) => {

    const { query } = req;

    let message = 'Suggest a highly creative and engaging educational activity for a randomly chosen topic. The activity can be suitable for any learning environment (classroom, outdoor, virtual, etc.) and may require either minimal or more intensive preparation.';

    const queryLength = Object.keys(query).length

    const { typology, objective, areas, educationLevel, playerType, braindump } = query;

    // When user only passes the braindump key
    if (queryLength === 1 && braindump) {
        message = `Create a highly creative and engaging educational activity structure. Consider the following context when generating the activity fields: ${braindump} `;
    }

    // When user passes form data and not only a braindump
    if (queryLength > 0 && !braindump) {
        message = 'Suggest a highly creative and engaging educational activity structure considering that the following elements have already been provided for you and you must include them in your response exactly the same: ';

        if (typology) message += `typology: ${typology}; `;
        if (objective) message += `objective.verb: ${objective.split(" ")[0]}; `;
        if (objective) message += `objective.title: ${objective}; `;
        if (areas) message += `areas: [${areas}]; `;
        if (educationLevel) message += `participants.educationLevel: ${educationLevel}; `;
        if (playerType) message += `participants.playerType: ${playerType}; `;
    }

    // When user passes form data and a braindump
    if (queryLength > 1 && braindump) {
        message = 'Suggest a highly creative and engaging educational activity structure considering that the following elements have already been provided for you and you must include them in your response exactly the same: ';

        if (typology) message += `typology: ${typology}; `;
        if (objective) message += `objective.verb: ${objective.split(" ")[0]}; `;
        if (objective) message += `objective.title: ${objective}; `;
        if (areas) message += `areas: [${areas}]; `;
        if (educationLevel) message += `participants.educationLevel: ${educationLevel}; `;
        if (playerType) message += `participants.playerType: ${playerType}; `;

        message += ` Also consider the following information when generating the rest of activity fields. This is important contextual information that should guide your response: ${braindump} `;
    }

    const response = await callOpenAI({
        ...initiativePrompts.structure,
        message
    });

    res.status(200).json(JSON.parse(response));
});

module.exports = {
    getInitiativeStructure,
}

