module.exports = function (ex, req, res, next) {
  res.status(500).send('Something failed');
};
