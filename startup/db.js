const mongoose = require('mongoose');
const appInfo = require('debug')('app:info');
const config = require('config');
const winston = require('winston');

function connect() {
  mongoose.connect(getConnectionString()).then(() => {
    appInfo('Connected to mongodb.');
    winston.info('Connected to mongodb.');
  });
}

function getConnectionString() {
  return `${config.get('db.host')}:${config.get('db.port')}/${config.get(
    'db.dbName'
  )}`;
}

module.exports = {
  connect,
  getConnectionString
};
