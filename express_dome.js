const express = require('express');

const app = express();

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

const port = process.env.NODE_PORT || 3000;

app.listen(port, () => console.log(`Server is listening on port ${port}...`));
