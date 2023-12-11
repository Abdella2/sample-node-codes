const mongoose = require('mongoose');
const appInfo = require('debug')('app:info');

const id = new mongoose.Types.ObjectId();

appInfo('Object id: ', id);
appInfo('Object id timestamp: ', id.getTimestamp());
appInfo('Object id hex: ', id.toHexString());

const invalidId = '123';

appInfo(
  `Is ${invalidId} valid object id`,
  mongoose.Types.ObjectId.isValid(invalidId)
);
