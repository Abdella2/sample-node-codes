const express = require('express');
const morgan = require('morgan');
const Joi = require('joi');
const logger = require('./custom_middleware');
const config = require('config');

const app = express();

app.use(express.json());
app.use(logger.log);

console.log(process.env);
console.log(`Environment Variable: ${process.env.NODE_ENV}`);
console.log(`Environment Variable: ${app.get('env')}`);

if (app.get('env')) {
  app.use(morgan('tiny'));
  morgan('combined', {
    skip: function (req, res) {
      return res.statusCode < 400;
    }
  });
  console.log('morgan enabled');
}

console.log(config.get('app_name'));
console.log(config.get('employee.dbConfig.host'));

let employees = [];

app.get('/', (req, res) => res.send('hello world'));

app.get('/api/customers', (req, res) =>
  res.send([{ id: 1, name: 'test customer' }])
);

app.get('/api/customers/:id', (req, res) => {
  const response = `
    params: ${JSON.stringify(req.params)} 
    id: ${req.params.id} 
    query: ${JSON.stringify(req.query)}
    `;
  res.send(response);
});

app.get('/api/employees', (req, res) => {
  res.send(employees);
});

app.get('/api/employees/:id', (req, res) => {
  if (+req.params.id !== 1) {
    res.status(404).send(`Employee with ${req.params.id} not found`);
    return;
  }

  res.send({ id: '1' });
});

app.post('/api/employees', (req, res) => {
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

app.put('/api/employees/:id', (req, res) => {
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

app.delete('/api/employees/:id', (req, res) => {
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

const port = process.env.NODE_PORT || 3000;

app.listen(port, () => console.log(`Server is listening on port ${port}...`));
