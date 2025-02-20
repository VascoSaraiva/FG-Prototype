const express = require('express');
const validate = require('../middlewares/validate');
const initiativeController = require('../controllers/initiative.controller');
const initiativeValidation = require('../validations/initiative.validation');

const router = express.Router();

router.get('/elements', initiativeController.getInitiativeElements)

module.exports = router;

