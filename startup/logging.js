const winston = require('winston');
const { getConnectionString } = require('./db');
require('express-async-errors');
require('winston-mongodb');

module.exports = function () {
  winston.add(new winston.transports.File({ filename: 'logfile.log' }));
  winston.add(
    new winston.transports.MongoDB({
      db: getConnectionString(),
      level: 'error'
    })
  );

  // process.on('uncaughtException', (ex) => {
  //   console.log('An UNCAUGHT EXCEPTION OCCURRED');
  //   winston.error(ex.message, ex);
  //   process.exit(1);
  // });
  // process.on('unhandledRejection', (ex) => {
  //   throw ex;
  // console.log('UNHANDLED PROMISE REJECTION.');
  // winston.error(ex.message, ex);
  // process.exit(1);
  // });
  winston.exceptions.handle(
    new winston.transports.Console({ colorize: true, prettyPrint: true }),
    new winston.transports.File({ filename: 'uncaughtException.log' })
  );

  // const p = Promise.reject(new Error('Something failed unexpected.'));
  // p.then(() => console.log('Request completed'));

  // throw new Error('Something failed during startup.');

  winston.add(new winston.transports.File({ filename: 'logfile.log' }));
  winston.add(
    new winston.transports.MongoDB({
      db: getConnectionString(),
      level: 'error'
    })
  );
};
