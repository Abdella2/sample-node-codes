const Joi = require('joi');
const mongoose = require('mongoose');
const express = require('express');

const router = express.Router();

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
    }
  })
);

// let employees = [];

router.get('/', async (req, res) => {
  const employees = await Employee.find().sort({ name: 1 });
  res.send(employees);
});

router.get('/:id', (req, res) => {
  if (+req.params.id !== 1) {
    res.status(404).send(`Employee with ${req.params.id} not found`);
    return;
  }

  res.send({ id: '1' });
});

router.post('/', async (req, res) => {
  // console.log(req.body);

  const { employeeNo, name, email, salary, paymentMethod, phone, departments } =
    req.body;

  // if (!name || name.length < 5) {
  //   res.status(400).send('Name should be at least 5 character.');
  //   return;
  // }

  // const regex = RegExp('[0-9]');

  // if (!mobile || !regex.test(mobile)) {
  //   res.status(400).send('Mobile number should be in a correct format');
  //   return;
  // }

  // console.log(valResult);

  const { error } = validateEmployee(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  let employee = new Employee({
    employeeNo,
    name,
    email,
    salary,
    paymentMethod,
    phone,
    departments
  });

  try {
    employee = await employee.save();
  } catch (ex) {
    return res.status(400).send(ex.message);
  }

  res.send(employee);
});

router.put('/:id', async (req, res) => {
  const { error } = validateEmployee(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  const { employeeNo, name, email, salary, paymentMethod, phone, departments } =
    req.body;

  let employee = new Employee({
    employeeNo,
    name,
    email,
    salary,
    paymentMethod,
    phone,
    departments
  });

  employee = await Employee.findByIdAndUpdate(req.params.id, employee, {
    new: true
  });

  if (!employee)
    return res.status(404).send(`Employee with id ${req.params.id} NOT found!`);

  // employee.name = req.body.name;
  // employee.mobile = req.body.mobile;

  // employee = { ...employee, ...req.body };

  res.send(employee);
});

router.delete('/:id', async (req, res) => {
  const employee = await Employee.findByIdAndRemove(req.params.id);

  if (!employee)
    return res.status(404).send(`Employee with id ${req.params.id} NOT found`);

  res.send(employee);
});

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
    departments: Joi.array()
  });

  return schema.validate(employee);
}

module.exports = router;
