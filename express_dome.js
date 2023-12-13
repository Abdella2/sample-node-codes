const appServer = require('debug')('app:server');
const winston = require('winston');
const express = require('express');
const app = express();
const { connect, getConnectionString } = require('./startup/db');
connect();

require('./startup/logging')();
require('./startup/routes')(app);
require('./startup/config')(app);

console.log(process.env);
console.log(`Environment Variable: ${process.env.NODE_ENV}`);
console.log(`Environment Variable: ${app.get('env')}`);

console.log(config.get('app_name'));
console.log(`Host: ${config.get('employee.dbConfig.host')}`);
console.log(`Password: ${config.get('employee.dbConfig.dbPassword')}`);

app.get('/', (req, res) => res.send('hello world'));

const port = process.env.NODE_PORT || 3000;

app.listen(port, () => appServer(`Server is listening on port ${port}...`));
