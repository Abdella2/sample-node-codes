const mongoose = require('mongoose');

const Company = mongoose.model(
  'Company',
  new mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    email: {
      type: String
    }
  })
);

exports.Company = Company;
