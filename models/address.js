const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
  houseNo: {
    type: String,
    required: true
  },
  street: {
    type: String
  }
});
const Address = mongoose.model('Address', addressSchema);

exports.Address = Address;
exports.addressSchema = addressSchema;
