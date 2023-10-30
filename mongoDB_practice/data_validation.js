// const mongoose = require('mongoose');
const appInfo = require('debug')('app:info');
const appError = require('debug')('app:error');
const config = require('config');
const mongoose = require('./index').mongoose;

// const dbUrl = `${config.get('db.host')}:${config.get('db.port')}/${config.get(
//   'db.dbName'
// )}`;

// mongoose
//   .connect(dbUrl)
//   .then(() => appInfo('Connected to mongodb.'))
//   .catch((err) => appError("can't connect to mongodb", err.message));

const employeeSchema = new mongoose.Schema({
  name: { type: String, required: true }
});

const Employee = mongoose.model('employee', employeeSchema);

const employee = new Employee({});

async function createEmployee() {
  try {
    const employeeInDB = await employee.save();
  } catch (ex) {
    appError(ex.message);
  }
}

createEmployee();
