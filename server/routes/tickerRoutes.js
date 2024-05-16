const express = require('express');
const router = express.Router();
const getTicker = require('../controllers/tickerController');

/**
 * @route GET /api/ticker/:symbol
 * @description Get the ticker data for a specific stock symbol.
 * @access Public
 * @returns {Object} The response object.
 */
router.get('/:symbol', getTicker);

module.exports = router;
