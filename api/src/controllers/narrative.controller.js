const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const callOpenAI = require('../utils/callOpenAI');
const narrativePrompts = require('../prompts/narrative.prompts');

const getNarrativeIngredients = catchAsync(async (req, res) => {

    const { query } = req;

    const { concept, conflict, genres, narrator, voice, typology, objective, areas, educationLevel, playerType } = query;

    let messageProperties = `{
        Typology: "${typology}",
        Activity Main Objective "${objective}",
        Related Areas: "[${areas}]",
        Audience Education Level: "${educationLevel}",
        Audience according to Bartle's Player Type: "${playerType}",
    }`;

    const formData = concept || conflict || genres || narrator || voice

    if (formData) {
        let customMessage = `Your client is designing an educational activity and wants a ficitional narrative story idea to serve as the background for the activity. They have some of the ideas figured it out. This is what they would like to see as the narrative elements. Do not modify or alter this information. Just the missing parts.
        {
        ${concept ? `concept: "${concept}"` : ''},
        ${conflict ? `conflict: "${conflict}"` : ''},
        ${genres ? `genres: "${genres}"` : ''},
        ${narrator ? `narrator.type: "${narrator}"` : ''},
        ${voice ? `narrator.voice: "${voice}"` : ''},
        }

        Also consider the following activity characteristics when crafting the remaining narrative elements:
        ${messageProperties}
        `;

        narrativePrompts.ingredients.message = customMessage;

    } else {
        narrativePrompts.ingredients.message = `${narrativePrompts.ingredients.message} ${messageProperties}`;
    }




    const response = await callOpenAI(narrativePrompts.ingredients);
    res.status(200).json(JSON.parse(response));
});

const getNarrativeMoments = catchAsync(async (req, res) => {

    const { query } = req;

    let messageProperties = `{
        Audience Educational Level: "${query.educationLevel}",
        Story Genre(s): ${query.genres},
        Story Title: "${query.title}",

        Story Concept: "${query.concept}",
        Protagonist: "${query.protagonist}",
        Secondary Characters: "${query.characters}",
        Scenario "${query.scenario}",
        Narrator: "${query.narrator}",
        Narration Voices: [${query.voice}],
        Suspense Element: "${query.suspense}",
    }`;

    narrativePrompts.moments.message = `${narrativePrompts.moments.message} ${messageProperties}`;

    const response = await callOpenAI(narrativePrompts.moments);
    res.status(200).json(JSON.parse(response));

});

module.exports = {
    getNarrativeIngredients,
    getNarrativeMoments,
}
