function log(req, res, next) {
  console.log('Intercept the request and process it for logging');
  next();
}

module.exports.log = log;
