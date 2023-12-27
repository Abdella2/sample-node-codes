const appServer = require('debug')('app:server');
const winston = require('winston');
const express = require('express');
const app = express();
const { connect, getConnectionString } = require('./startup/db');
connect();

require('./startup/logging')();
require('./startup/routes')(app);
require('./startup/config')(app);

const port = process.env.NODE_PORT || 3000;

app.listen(port, () => appServer(`Server is listening on port ${port}...`));
