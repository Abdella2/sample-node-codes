const jwt = require('jsonwebtoken');
const config = require('config');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const { User, validateUser } = require('../models/user');
const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const auth = require('../middlewares/auth');

router.get('/me', auth, async (req, res, next) => {
  try {
    const user = await User.findOne({ _id: req.user._id }).select(
      '-password -__v'
    );
    res.send(user);
  } catch (ex) {
    next();
  }
});

router.post('/', async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) {
    const errors = {};
    error.details.map((err) => (errors[err.path[0]] = err.message));
    return res.status(400).send(errors);
  }

  let user = await User.findOne({ email: req.body.email });
  if (user)
    return res.status(400).send('User with the given email already exist.');

  user = new User(_.pick(req.body, ['name', 'email', 'password']));
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  try {
    await user.save();
  } catch (ex) {
    return res.status(400).send(ex.message);
  }

  const token = user.generateAuthToken();
  res
    .header('x-auth-token', token)
    .send(_.pick(user, ['_id', 'name', 'email']));
});

module.exports = router;
