const mongoose = require('mongoose');
const appInfo = require('debug')('app:info');
const appError = require('debug')('app:error');
const config = require('config');

const dbUrl = `${config.get('db.host')}:${config.get('db.port')}/${config.get(
  'db.dbName'
)}`;

mongoose
  .connect(dbUrl)
  .then(() => appInfo('Connected to mongodb.'))
  .catch((err) => appError("can't connect to mongodb", err.message));
