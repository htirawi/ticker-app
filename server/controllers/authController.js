const axios = require('axios');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const config = require('../config/config');

const { hostname, tokenPath, headers } = config.oauth;
const { secret, saltRounds } = config.jwt;

/**
 * Requests an OAuth token from the authentication server.
 * @param {string} username - The username of the user.
 * @param {string} password - The password of the user.
 * @returns {Promise<Object>} The response data containing the access and refresh tokens.
 * @throws Will throw an error if the OAuth token request fails.
 */
const requestOAuthToken = async (username, password) => {
  try {
    const response = await axios.post(`${hostname}${tokenPath}`, null, {
      headers,
      params: {
        grant_type: 'password_grant',
        username,
        password,
        scope: 'write read',
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(
      `OAuth token request failed: ${
        error.response?.data?.message || error.message
      }`
    );
  }
};

/**
 * Requests a new access token using the refresh token.
 * @param {string} refreshToken - The refresh token of the user.
 * @returns {Promise<Object>} The response data containing the new access and refresh tokens.
 * @throws Will throw an error if the refresh token request fails.
 */
const requestRefreshToken = async (refreshToken) => {
  try {
    const response = await axios.post(`${hostname}${tokenPath}`, null, {
      headers,
      params: {
        grant_type: 'refresh_token',
        refresh_token: refreshToken,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(
      `Refresh token request failed: ${
        error.response?.data?.message || error.message
      }`
    );
  }
};

/**
 * Creates a JWT token.
 * @param {string} accessToken - The access token.
 * @param {number} expiresIn - The expiration time of the token.
 * @returns {string} The JWT token.
 */
const createJWT = (accessToken, expiresIn) => {
  return jwt.sign(
    {
      access_token: accessToken,
      expires_in: expiresIn,
    },
    secret,
    { expiresIn }
  );
};

/**
 * Hashes a password.
 * @param {string} password - The password to hash.
 * @returns {Promise<string>} The hashed password.
 */
const hashPassword = async (password) => {
  return await bcrypt.hash(password, saltRounds);
};

/**
 * Saves or updates a user in the database.
 * @param {string} username - The username of the user.
 * @param {string} hashedPassword - The hashed password of the user.
 * @param {string} refreshToken - The refresh token of the user.
 * @returns {Promise<void>}
 */
const saveUser = async (username, hashedPassword, refreshToken) => {
  const user = await User.findOne({ username });
  if (!user) {
    const newUser = new User({
      username,
      password: hashedPassword,
      refreshToken,
    });
    await newUser.save();
  } else {
    user.refreshToken = refreshToken;
    await user.save();
  }
};

/**
 * Handles user login.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>}
 */
const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    let user = await User.findOne({ username });

    if (user) {
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        throw new Error('Invalid credentials');
      }
    }

    const { access_token, refresh_token, expires_in } = await requestOAuthToken(
      username,
      password
    );
    const token = createJWT(access_token, expires_in);
    // const hashedPassword = user ? user.password : await hashPassword(password);
    const userPassword = user ? user.password : password;

    await saveUser(username, userPassword, refresh_token);

    res.json({
      access_token: token,
      refresh_token,
      isAuthenticated: true,
      expires_in,
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(401).json({ message: error.message });
  }
};

/**
 * Handles token refresh.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>}
 */
const refreshToken = async (req, res) => {
  const { refreshToken: oldRefreshToken } = req.body;

  try {
    const {
      access_token,
      refresh_token: newRefreshToken,
      expires_in,
    } = await requestRefreshToken(oldRefreshToken);
    const token = createJWT(access_token, expires_in);

    const user = await User.findOne({ refreshToken: oldRefreshToken });
    if (user) {
      user.refreshToken = newRefreshToken;
      await user.save();
    }

    res.json({
      access_token: token,
      refresh_token: newRefreshToken,
      expires_in,
    });
  } catch (error) {
    console.error('Refresh token error:', error);
    res.status(401).json({ message: error.message });
  }
};

module.exports = { login, refreshToken };
