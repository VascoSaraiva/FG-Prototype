const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const callOpenAI = require('../utils/callOpenAI');
const narrativePrompts = require('../prompts/narrative.prompts');

const getNarrativeIngredients = catchAsync(async (req, res) => {

    const { query } = req;

    let messageProperties = `{
        Typology: "${query.typology}",
        Activity Main Objective "${query.objective}",
        Related Areas: "[${query.areas}]",
        Audience Education Level: "${query.educationLevel}",
        Audience according to Bartle's Player Type: "${query.playerType}",
    }`;

    narrativePrompts.ingredients.message = `${narrativePrompts.ingredients.message} ${messageProperties}`;

    const response = await callOpenAI(narrativePrompts.ingredients);
    res.status(200).json(JSON.parse(response));
});

const getNarrativeMoments = catchAsync(async (req, res) => {
    
    const { query } = req;

    let messageProperties = `{
        Audience Educational Level: "${query.educationLevel}",
        Story Genre(s): [${query.genres}],
        Story Title: "${query.title}",

        Story Concept: "${query.concept}",
        "Protagonist": "${query.protagonist}",
        "Secondary Characters: "${query.characters}",
        Scenario "${query.scenario}",
        Narrator: "${query.narrator}",
        Narration Voices: [${query.voices}],
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
