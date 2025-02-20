const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const callOpenAI = require('../utils/callOpenAI');

const getNarrativeElements = catchAsync(async (req, res) => {
    const response = await callOpenAI('You are gamification storyteller.', 'Say how much you love narrative elements');
    res.send(response);
});

const getNarrativeMoments = catchAsync(async (req, res) => {
    const response = await callOpenAI('You are storyteller', 'Say how much you love stories that have 5 moments (chapters)');
    res.send(response);
});

module.exports = {
    getNarrativeElements,
    getNarrativeMoments,
}
