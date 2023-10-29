const express = require('express');

const router = express.Router();

router.get('/', (req, res) => res.send([{ id: 1, name: 'test customer' }]));

router.get('/:id', (req, res) => {
  const response = `
    params: ${JSON.stringify(req.params)} 
    id: ${req.params.id} 
    query: ${JSON.stringify(req.query)}
    `;
  res.send(response);
});

module.exports = router;
