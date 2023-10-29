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

const customerSchema = new mongoose.Schema({
  name: String,
  phone: [Number],
  invoiceDate: { type: Date, default: Date.now },
  isGold: Boolean
});

const Customer = mongoose.model('customer', customerSchema);

const customer = new Customer({
  name: 'John 2',
  phone: [910, 1911],
  isGold: true
});

async function createEmployee() {
  const customerInDB = await customer.save();
  appInfo(`Saved Customer: ${customerInDB}`);
}

createEmployee();
