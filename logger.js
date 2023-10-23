console.log(__filename);
console.log(__dirname);
const url = '...';

const EventEmitter = require('events');

// function log(message) {
//   console.log(message);
// }

// module.exports.log = log;

class Logger extends EventEmitter {
  log(message) {
    console.log(message);
    this.emit('messageLogged', { id: 2, url: 'http://logger.com' });
  }
}

module.exports = Logger;
