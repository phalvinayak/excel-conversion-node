const express = require('express');
const fileHandler = require('./controllers/FileHandler');

const router = express.Router();
router.use('/file', fileHandler);

module.exports = router;