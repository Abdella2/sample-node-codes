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
  isGold: Boolean,
  amountLimits: Number
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

async function displayEmployee() {
  const customers = await Customer.find({ name: 'John 2' })
    .sort({ name: 1, isGold: 1 })
    .limit(10)
    .select({ name: 1, isGold: 1 });

  appInfo(customers);
}

async function comparisonOperator() {
  let customers = await Customer.find({ amountLimits: { $eq: 1000 } });
  customers = await Customer.find({ amountLimits: { $ne: 1000 } });
  customers = await Customer.find({ amountLimits: { $gte: 1000, $lte: 5000 } });
  customers = await Customer.find({
    amountLimits: { $in: [1000, 2000, 2500] }
  });
}

async function logicalOperator() {
  let customer = await Customer.find()
    .or([{ name: 'John' }, { isGold: false }])
    .and([{ name: 'John' }, { isGold: false }]);
}

async function regularExpression() {
  let customer = await Customer.find({ name: /^John$/i });
}

async function numberOfEmployees() {
  let numberOfCustomer = await Customer.count();
  appInfo('Number of employees: ', numberOfCustomer);
}

async function getCustomer(pageNumber, pageSize) {
  return await Customer.find()
    .skip((pageNumber - 1) * pageSize)
    .limit(pageSize);
}

async function queryFirstUpdate(id) {
  const customer = await Customer.findById(id);

  if (!customer) return;

  customer.set({
    name: 'Update John'
  });

  const updatedCustomer = await customer.save();
  appInfo(updatedCustomer);
}

async function updateFirstUpdate(id) {
  const result = await Customer.updateOne(
    { _id: id },
    { name: 'direct updated John' }
  );
  console.log('Returns Update result: ', result);

  const customer = await Customer.findByIdAndUpdate(
    id,
    { amountLimits: 7654 },
    { new: true }
  );
  console.log('Returns updated customer: ', customer);
}

async function deleteEmployee(id) {
  const result = await Customer.deleteOne({ _id: id });
  console.log('Returns delete result: ', result);

  const customer = await Customer.findByIdAndDelete(id);
  console.log('Returns deleted customer: ', customer);
}

// displayEmployee();
// createEmployee();
// numberOfEmployees();
const id = '653e576470d72043f44b3213';
// queryFirstUpdate(id);
// updateFirstUpdate(id);
deleteEmployee(id);
