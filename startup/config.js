const config = require('config');
const appInfo = require('debug')('app:info');
const morgan = require('morgan');
module.exports = function (app) {
  if (!config.get('jwtPrivateKey')) {
    throw new Error('JWT private key not defined.');
  }

  if (app.get('env')) {
    app.use(morgan('tiny'));
    morgan('combined', {
      skip: function (req, res) {
        return res.statusCode < 400;
      }
    });
    appInfo('morgan enabled');
  }
};
