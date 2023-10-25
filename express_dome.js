const express = require('express');

const app = express();

app.use(express.json());

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

  if (!name || name.length < 5) {
    res.status(400).send('Name should be at least 5 character.');
    return;
  }

  const regex = RegExp('[0-9]');

  if (!mobile || !regex.test(mobile)) {
    res.status(400).send('Mobile number should be in a correct format');
    return;
  }

  const employee = {
    id: employees.length,
    name,
    mobile
  };

  employees.push(employee);

  res.send(employee);
});

const port = process.env.NODE_PORT || 3000;

app.listen(port, () => console.log(`Server is listening on port ${port}...`));
