const express = require('express');
const { Gender } = require('../models/gender');
const router = express.Router();

router.get('/', async (req, res) => {
  const genders = await Gender.find();

  res.send(genders);
});

module.exports = router;
