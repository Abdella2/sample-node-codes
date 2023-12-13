const employees = require('../routes/employees');
const customers = require('../routes/customers');
const posts = require('../routes/posts');
const genders = require('../routes/genders');
const users = require('../routes/users');
const auth = require('../routes/auth');
const cors = require('cors');
const express = require('express');
const error = require('../middlewares/error');
const logger = require('../middlewares/custom_middleware');

module.exports = function (app) {
  app.use(express.json());
  app.use(cors());
  app.use(logger.log);
  app.use('/api/employees', employees);
  app.use('/api/customers', customers);
  app.use('/api/posts', posts);
  app.use('/api/genders', genders);
  app.use('/api/users', users);
  app.use('/api/auth', auth);
  app.use(express.static('public'));
  app.use(error);
};
