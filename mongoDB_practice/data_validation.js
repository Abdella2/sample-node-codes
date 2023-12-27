const mongoose = require('mongoose');
const appInfo = require('debug')('app:info');
const appError = require('debug')('app:error');
const config = require('config');

// const dbUrl = `${config.get('db.host')}:${config.get('db.port')}/${config.get(
//   'db.dbName'
// )}`;

// mongoose
//   .connect(dbUrl)
//   .then(() => appInfo('Connected to mongodb.'))
//   .catch((err) => appError("can't connect to mongodb", err.message));

const employeeSchema = new mongoose.Schema({
  employeeNo: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 255,
    match: /^EMP[0-9]{3}/i
  },
  name: {
    type: String,
    required: true,
    uppercase: true,
    trim: true,
    get: (v) => `Emp ${v}`,
    set: (v) => v.replace('Emp ', ''),
    validate: (v) =>
      new Promise((resolve, reject) =>
        setTimeout(reject(new Error(`Oops! value -> ${v}`)), 1000)
      )
  },
  email: {
    type: String,
    validate: {
      validator: () => Promise.resolve(false),
      message: 'Email validation failed'
    }
  },
  salary: {
    type: Number,
    min: [1000, 'should be greater than 1000'],
    max: 1200
  },
  paymentMethod: {
    type: String,
    enum: ['Cash', 'Credit'],
    required: function () {
      return this.salary > 1000 && this.salary < 1200;
    }
  },
  phone: {
    type: String,
    required: [true, 'Employee phone number required'],
    validate: {
      validator: function (v) {
        return /\d{3}-\d{3}-\d{4}/.test(v);
      },
      message: (props) => `${props.value} is not a valid phone number!`
    }
  },
  departments: {
    type: Array,
    validate: {
      validator: function (v) {
        return v && v.length > 0;
      },
      message: 'Employee should has at least one department.'
    }
  }
});

const Employee = mongoose.model('Employee', employeeSchema);

const employee = new Employee({
  name: 'John',
  email: 'ab@gm',
  employeeNo: 'EMP012',
  salary: 1100,
  paymentMethod: 'Cash',
  phone: '123-123-1234',
  departments: ['computer science']
});

async function createEmployee() {
  // const error = employee.validateSync();

  // if (error) {
  //   appError('Errors: ', error.errors['name']);
  //   appError('Errors Message: ', error.errors['name'].message);
  //   appError('Path: ', error.errors['name'].path);
  //   appError('Type: ', error.errors['name'].kind);
  //   appError('Value: ', error.errors['name'].value);
  //   appError('Message', error.message);
  //   return;
  // }

  try {
    const employeeInDB = await employee.save();
  } catch (ex) {
    for (field in ex.errors)
      appError(`${ex.errors[field].path} -> ${ex.errors[field].message}`);
  }
}

createEmployee();
