const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const callOpenAI = require('../utils/callOpenAI');

const getNarrativeIngredients = catchAsync(async (req, res) => {
    // const response = await callOpenAI('You are gamification storyteller.', 'Say how much you love narrative elements');
    setTimeout(() => res.send('Hello Narrative Ingredients!'), 1000);
});

const getNarrativeMoments = catchAsync(async (req, res) => {
    // const response = await callOpenAI('You are storyteller', 'Say how much you love stories that have 5 moments (chapters)');
    setTimeout(() => res.send('Hello Narrative Moments!'), 1000);
});

module.exports = {
    getNarrativeIngredients,
    getNarrativeMoments,
}
