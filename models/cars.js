const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  model: {
    type: String
  }
});

const Car = mongoose.model('Car', carSchema);

exports.Car = Car;
exports.carSchema = carSchema;
