const jwt = require('jsonwebtoken');
const config = require('config');
const auth = require('./auth');

module.exports = function (req, res, next) {
  if (!req.user.isAdmin) return res.status(403).send('Access denied.');
  next();
};
