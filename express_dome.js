const express = require('express');

const app = express();

app.get('/', (req, res) => res.send('hello world'));

app.get('/api/customers', (req, res) =>
  res.send([{ id: 1, name: 'test customer' }])
);

app.listen('3000', () => console.log('Server is listening on port 3000...'));
