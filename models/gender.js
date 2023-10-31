const mongoose = require('mongoose');

const genderSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  }
});

const Gender = mongoose.model('Gender', genderSchema);

exports.Gender = Gender;
exports.genderSchema = genderSchema;
