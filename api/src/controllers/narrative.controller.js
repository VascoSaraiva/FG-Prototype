const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const callOpenAI = require('../utils/callOpenAI');
const narrativePrompts = require('../prompts/narrative.prompts');

const getNarrativeIngredients = catchAsync(async (req, res) => {

    const { query } = req;

    const queryLength = Object.keys(query).length

    const { concept, conflict, genres, narrator, voice, typology, objective, areas, educationLevel, playerType, braindump } = query;

    let message = `Your client is designing an educational activity and wants a fictional narrative story idea to serve as the background for the activity. Suggest highly creative narrative elements that could form the basis for a story. Consider the following activity characteristics when crafting the narrative elements: Activity Typology: "${typology}"; Activity Main Objective "${objective}"; Related Areas: "[${areas}]"; Audience Education Level: "${educationLevel}"; Audience according to Bartle's Player Type: "${playerType}";`

    // When user passes the initiative data and only the braindump
    if(queryLength === 6 && braindump) {
        message += `Also consider the following information when generating the narrative elements. This is very important contextual information that should guide the narrative elements you create: ${braindump}`;
    }

    // When user passes the initiative data and at least one form data, but not the braindump
    if(queryLength >= 6 && !braindump) {
        message += 'Your client also has some of the narrative ideas figured out. Include this narrative elements in your response and do not modify or alter this information. Just complete the missing parts: ';

        if(concept) message += `concept: "${concept}"; `;
        if(conflict) message += `conflict: "${conflict}"; `;
        if(genres) message += `genres: "${genres}"; `;
        if(narrator) message += `narrator.type: "${narrator}"; `;
        if(voice) message += `narrator.voice: "${voice}"; `;
    }

     // When user passes the initiative data, the braindump and at least one form data
     if(queryLength >= 7 && braindump) {
        message += 'Your client also has some of the narrative ideas figured out. Include this narrative elements in your response and do not modify or alter this information. Just complete the missing parts: ';

        if(concept) message += `concept: "${concept}"; `;
        if(conflict) message += `conflict: "${conflict}"; `;
        if(genres) message += `genres: "${genres}"; `;
        if(narrator) message += `narrator.type: "${narrator}"; `;
        if(voice) message += `narrator.voice: "${voice}"; `;

        message += `Also consider the following information when generating the rest of narrative elements. This is very important contextual information that should guide the remaining narrative elements you create: ${braindump}`;
     }

    const response = await callOpenAI({
        ...narrativePrompts.ingredients,
        message
    });

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
