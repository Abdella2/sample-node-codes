const error = require('./middlewares/error');
const mongoose = require('mongoose');
const express = require('express');
const morgan = require('morgan');
const appInfo = require('debug')('app:info');
const appServer = require('debug')('app:server');
const logger = require('./middlewares/custom_middleware');
const config = require('config');
const employees = require('./routes/employees');
const customers = require('./routes/customers');
const posts = require('./routes/posts');
const genders = require('./routes/genders');
const users = require('./routes/users');
const auth = require('./routes/auth');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());
app.use(logger.log);
app.use('/api/employees', employees);
app.use('/api/customers', customers);
app.use('/api/posts', posts);
app.use('/api/genders', genders);
app.use('/api/users', users);
app.use('/api/auth', auth);
app.use(express.static('public'));
app.use(error);

const dbUrl = `${config.get('db.host')}:${config.get('db.port')}/${config.get(
  'db.dbName'
)}`;

mongoose
  .connect(dbUrl)
  .then(() => appInfo('Connected to mongodb.'))
  .catch((err) => appError("can't connect to mongodb", err.message));

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
