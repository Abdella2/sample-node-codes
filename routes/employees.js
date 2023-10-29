const express = require('express');

const router = express.Router();

let employees = [];

router.get('/', (req, res) => {
  res.send(employees);
});

router.get('/:id', (req, res) => {
  if (+req.params.id !== 1) {
    res.status(404).send(`Employee with ${req.params.id} not found`);
    return;
  }

  res.send({ id: '1' });
});

router.post('/', (req, res) => {
  console.log(req.body);

  const { name, mobile } = req.body;

  // if (!name || name.length < 5) {
  //   res.status(400).send('Name should be at least 5 character.');
  //   return;
  // }

  // const regex = RegExp('[0-9]');

  // if (!mobile || !regex.test(mobile)) {
  //   res.status(400).send('Mobile number should be in a correct format');
  //   return;
  // }

  const valResult = validateEmployee(req.body);

  console.log(valResult);

  if (valResult.error) {
    return res.status(400).send(valResult.error.details[0].message);
  }

  const employee = {
    id: employees.length,
    name,
    mobile
  };

  employees.push(employee);

  res.send(employee);
});

router.put('/:id', (req, res) => {
  const employee = employees.find((emp) => emp.id === +req.params.id);

  if (!employee)
    return res
      .status(404)
      .send(`Employee with id ${requ.params.id} NOT found!`);

  const { error } = validateEmployee(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  // employee.name = req.body.name;
  // employee.mobile = req.body.mobile;

  employee = { ...employee, ...req.body };

  res.send(employee);
});

router.delete('/:id', (req, res) => {
  const employee = employees.find((emp) => emp.id === +req.params.id);

  if (!employee)
    return res.status(404).send(`Employee with id ${req.params.id} NOT found`);

  const index = employees.findIndex((emp) => emp.id === +req.params.id);
  employees.splice(index, 1);

  res.send(employee);
});

function validateEmployee(employee) {
  const schema = Joi.object({
    name: Joi.string().required().min(5),
    mobile: Joi.string().required().pattern(new RegExp('^[0-9]{6}$'))
  });

  return schema.validate(employee);
}

module.exports = router;
