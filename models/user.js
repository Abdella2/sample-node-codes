const jwt = require('jsonwebtoken');
const config = require('config');
const Joi = require('joi');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, minlength: 5, maxlength: 50, required: true },
  email: {
    type: String,
    minlength: 5,
    maxlength: 255,
    required: true,
    unique: true
  },
  password: { type: String, required: true, minlength: 5, maxlength: 1024 },
  isAdmin: { type: Boolean, required: true }
});
userSchema.methods.generateAuthToken = function () {
  return jwt.sign(
    { _id: this.id, name: this.name, email: this.email, isAdmin: this.isAdmin },
    config.get('jwtPrivateKey')
  );
};

const User = mongoose.model('User', userSchema);

function validateUser(user) {
  const schema = Joi.object({
    name: Joi.string().min(5).max(50).required(),
    email: Joi.string().min(5).max(255).email().required(),
    password: Joi.string().min(5).required(255)
  });

  return schema.validate(user);
}

function validateAuth(user) {
  const schema = Joi.object({
    email: Joi.string().min(5).max(255).email().required(),
    password: Joi.string().min(5).required(255)
  });

  return schema.validate(user, { allowUnknown: true });
}

// exports.User = User;
// exports.validate = validate;
module.exports = {
  User,
  validateUser,
  validateAuth
};
