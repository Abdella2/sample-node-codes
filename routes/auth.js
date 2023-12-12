const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();
const { User, validateAuth } = require('../models/user');

router.post('/', async (req, res) => {
  const { error } = validateAuth(req.body);
  if (error) {
    const errors = {};
    error.details.map((err) => (errors[err.path[0]] = err.message));
    return res.status(400).send(errors);
  }

  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send('Invalid email or password');

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send('Invalid email or password');

  res.send(true);
});

module.exports = router;
