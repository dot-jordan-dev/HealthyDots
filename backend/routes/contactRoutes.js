const express = require('express');
const router = express.Router();
const { submitContact} = require('../Controllers/ContaCtcotrollers');

router.post('/send', submitContact);

module.exports = router;