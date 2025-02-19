const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const callOpenAI = require('../utils/callOpenAI');

const getInitiative = catchAsync(async (req, res) => {
    res.send('Hello World');
});


module.exports = {
    getInitiative,
}