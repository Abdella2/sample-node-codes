// /*jshint esversion: 11 */
global.console.log('well come');
var message = 'wow';
console.log(global.message);
console.log(module);
const logger = require('./logger');

logger.log('message');

// require('./path_object');
// require('./test_os_module');
// require('./test_filesystem_module');
// require('./event_module');
const Logger = require('./logger');

const logger = new Logger();

logger.on('messageLogged', (e) => {
  console.log(e);
});

logger.log('message is cached!!');
