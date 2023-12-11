const http = require('http');

const server = http.createServer((req, res) => {
  if (req.url === '/') {
    res.write('wel come');
    res.end();
  }

  if (req.url === '/api/customers') {
    res.write(JSON.stringify([{ id: 1, name: 'hone' }]));
    res.end();
  }

  if (req.url === '/api/posts') {
    res.write(JSON.str);
  }
});

// server.on('connection', (socket) => console.log(socket));

server.listen(4000);
console.log('Server listening on port 4000');
