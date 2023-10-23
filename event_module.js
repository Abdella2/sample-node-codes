const EventEmitter = require('events');

const eventEmitter = new EventEmitter();

eventEmitter.on('messageLogged', (eventArg) => {
  console.log(eventArg.id);
  console.log(eventArg.url);
});

eventEmitter.emit('messageLogged', {
  id: 1,
  url: '...'
});
