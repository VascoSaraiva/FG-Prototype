const express = require('express');
const validate = require('../middlewares/validate');
const initiativeValidation = require('../validations/initiative.validation');
const initiativeController = require('../controllers/initiative.controller');

const router = express.Router();

router
    .route('/')
    .get(initiativeController.getInitiative)


module.exports = router;

