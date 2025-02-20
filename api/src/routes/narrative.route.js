const express = require('express');
const validate = require('../middlewares/validate');
const narrativeController = require('../controllers/narrative.controller');
const narrativeValidation = require('../validations/narrative.validation');

const router = express.Router();

router.get('/elements', narrativeController.getNarrativeElements);
router.get('/moments', narrativeController.getNarrativeMoments);

module.exports = router;