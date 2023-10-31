const Joi = require('joi');
const mongoose = require('mongoose');
const { Company } = require('./company');
const { addressSchema, Address } = require('./address');
const { carSchema } = require('./cars');

const Employee = mongoose.model(
  'Employee',
  new mongoose.Schema({
    employeeNo: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 255,
      match: /^EMP[0-9]{3}/i
    },
    name: {
      type: String,
      required: true
    },
    email: {
      type: String
    },
    salary: {
      type: Number,
      min: [1000, 'should be greater than 1000'],
      max: 1200
    },
    paymentMethod: {
      type: String,
      enum: ['Cash', 'Credit'],
      required: function () {
        return this.salary > 1000 && this.salary < 1200;
      }
    },
    phone: {
      type: String,
      required: [true, 'Employee phone number required'],
      validate: {
        validator: function (v) {
          return /\d{3}-\d{3}-\d{4}/.test(v);
        },
        message: (props) => `${props.value} is not a valid phone number!`
      }
    },
    departments: {
      type: Array,
      validate: {
        validator: function (v) {
          return v && v.length > 0;
        },
        message: 'Employee should has at least one department.'
      }
    },
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Company'
    },
    address: {
      type: addressSchema,
      required: true
    },
    cars: [carSchema]
  })
);

function validateEmployee(employee) {
  const schema = Joi.object({
    name: Joi.string().required().min(5),
    phone: Joi.string()
      .required()
      .pattern(new RegExp(/\d{3}-\d{3}-\d{4}/)),
    employeeNo: Joi.string()
      .required()
      .min(1)
      .max(255)
      .pattern(/^EMP[0-9]{3}/i),
    email: Joi.string(),
    salary: Joi.number().min(1000).max(1200),
    paymentMethod: Joi.string(),
    departments: Joi.array(),
    company: Joi.string().required(),
    address: Joi.object(),
    cars: Joi.array()
  });

  return schema.validate(employee);
}

exports.Employee = Employee;
exports.validate = validateEmployee;
