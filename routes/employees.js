const auth = require('../middlewares/auth');
const admin = require('../middlewares/admin');
const express = require('express');
const { Employee, validate } = require('../models/employee');
const { Address } = require('../models/address');
const { Car } = require('../models/cars');
const { Gender } = require('../models/gender');
const appInfo = require('debug')('app:info');

const router = express.Router();

// let employees = [];

router.get('/', async (req, res) => {
  throw new Error("Couldn't get the employees");
  const employees = await Employee.find()
    .populate('company', 'name -_id')
    .sort({ name: 1 });
  res.send(employees);
});

router.get('/:id', async (req, res) => {
  const employee = await Employee.findById(req.params.id);
  if (!employee) {
    res.status(404).send(`Employee with ${req.params.id} not found`);
    return;
  }

  res.send(employee);
});

router.post('/', auth, async (req, res) => {
  // console.log(req.body);

  const {
    employeeNo,
    name,
    email,
    salary,
    paymentMethod,
    phone,
    departments,
    company,
    address,
    cars,
    genderId
  } = req.body;

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
  const { error } = validate(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  const gender = await Gender.findById(genderId);
  if (!gender)
    return res.status(400).send(`Gender with id ${genderId} doesn't exist`);

  let employee = new Employee({
    employeeNo,
    name,
    email,
    salary,
    paymentMethod,
    phone,
    departments,
    company,
    address,
    cars,
    gender: {
      _id: gender._id,
      name: gender.name
    }
  });

  try {
    employee = await employee.save();
  } catch (ex) {
    return res.status(400).send(ex.message);
  }

  res.send(employee);
});

router.put('/:id', auth, async (req, res) => {
  const { error } = validate(req.body);

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
router.put('/:id/address', auth, async (req, res) => {
  // const { error } = validate(req.body);

  // if (error) return res.status(400).send(error.details[0].message);

  const { houseNo, street } = req.body;

  let address = new Address({
    houseNo,
    street
  });
  appInfo('Address: ', address);
  let employee = await Employee.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        address: address
      }
    },
    {
      new: true
    }
  );

  if (!employee)
    return res.status(404).send(`Employee with id ${req.params.id} NOT found!`);

  res.send(employee);
});

router.delete('/:id/address', async (req, res) => {
  let employee = await Employee.findByIdAndUpdate(
    req.params.id,
    {
      $unset: {
        address: ''
      }
    },
    {
      new: true
    }
  );

  if (!employee)
    return res.status(404).send(`Employee with id ${req.params.id} NOT found!`);

  res.send(employee);
});

router.delete('/:id', [auth, admin], async (req, res) => {
  const employee = await Employee.findByIdAndRemove(req.params.id);

  if (!employee)
    return res.status(404).send(`Employee with id ${req.params.id} NOT found`);

  res.send(employee);
});

router.post('/:id/cars', async (req, res) => {
  const { name, model } = req.body;

  let car = new Car({
    name,
    model
  });

  let employee = await Employee.findById(req.params.id);

  if (!employee)
    return res.status(404).send(`Employee with id ${req.params.id} NOT found!`);

  employee.cars.push(car);
  employee.save();

  res.send(employee);
});

router.delete('/:employeeId/cars/:carId', async (req, res) => {
  let employee = await Employee.findById(req.params.employeeId);

  if (!employee)
    return res.status(404).send(`Employee with id ${req.params.id} NOT found!`);

  const car = employee.cars.id(req.params.carId);
  employee.cars.pull(car);
  employee.save();

  res.send(employee);
});

module.exports = router;
