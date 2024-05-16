const express = require('express');
const router = express.Router();
const { login } = require('../controllers/authController');

/**
 * @route POST /api/auth/login
 * @description Logs the user in.
 * @access Public
 * @returns {Object} The response object.
 */
router.post('/login', login);

module.exports = router;
