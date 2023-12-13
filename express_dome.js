require('express-async-errors');
require('winston-mongodb');
const winston = require('winston');
const express = require('express');
const morgan = require('morgan');
const appInfo = require('debug')('app:info');
const appServer = require('debug')('app:server');
const config = require('config');
const { connect } = require('./startup/db');

connect();
const app = express();

require('./startup/routes')(app);

winston.add(new winston.transports.File({ filename: 'logfile.log' }));
winston.add(
  new winston.transports.MongoDB({
    db: getConnectionString(),
    level: 'error'
  })
);

process.on('uncaughtException', (ex) => {
  console.log('An UNCAUGHT EXCEPTION OCCURRED');
  winston.error(ex.message, ex);
  process.exit(1);
});

process.on('unhandledRejection', (ex) => {
  console.log('UNHANDLED PROMISE REJECTION.');
  winston.error(ex.message, ex);
  process.exit(1);
});

const p = Promise.reject(new Error('Something failed unexpected.'));
p.then(() => console.log('Request completed'));

// throw new Error('Something failed during startup.');

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
  appInfo('morgan enabled');
}

console.log(config.get('app_name'));
console.log(`Host: ${config.get('employee.dbConfig.host')}`);
console.log(`Password: ${config.get('employee.dbConfig.dbPassword')}`);

app.get('/', (req, res) => res.send('hello world'));

const port = process.env.NODE_PORT || 3000;

app.listen(port, () => appServer(`Server is listening on port ${port}...`));
