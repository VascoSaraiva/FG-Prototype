const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const callOpenAI = require('../utils/callOpenAI');

const getInitiativeElements = catchAsync(async (req, res) => {
    const response = await callOpenAI('You are gamification designer.', 'Say how much you love "initiatives');
    res.send(response);
});


module.exports = {
    getInitiativeElements,
}