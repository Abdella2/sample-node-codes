console.log(__filename);
console.log(__dirname);
const url = '...';

import EventEmitter from 'events';

// function log(message) {
//   console.log(message);
// }

// module.exports.log = log;

class Logger extends EventEmitter {
  log(message) {
    console.log(message);
    emit('messageLogged', { id: 2, url: 'http://logger.com' });
  }
}

module.exports = Logger;
