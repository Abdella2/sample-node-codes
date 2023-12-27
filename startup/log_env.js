module.exports = function () {
  console.log(process.env);
  console.log(`Environment Variable: ${process.env.NODE_ENV}`);
  console.log(`Environment Variable: ${app.get('env')}`);

  console.log(config.get('app_name'));
  console.log(`Host: ${config.get('employee.dbConfig.host')}`);
  console.log(`Password: ${config.get('employee.dbConfig.dbPassword')}`);

  app.get('/', (req, res) => res.send('hello world'));
};
