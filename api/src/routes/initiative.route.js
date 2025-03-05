const express = require('express');
const validate = require('../middlewares/validate');
const initiativeController = require('../controllers/initiative.controller');
const initiativeValidation = require('../validations/initiative.validation');

const router = express.Router();

router.get('/structure', initiativeController.getInitiativeStructure)

module.exports = router;

