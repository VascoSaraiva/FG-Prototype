const express = require('express');
const validate = require('../middlewares/validate');
const badgeController = require('../controllers/badge.controller');
const badgeValidation = require('../validations/badge.validation');

const router = express.Router();

router.get('/', badgeController.getBadges);

module.exports = router;