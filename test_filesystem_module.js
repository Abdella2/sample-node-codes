const fs = require('fs');

const files = fs.readdirSync('./');
console.log(`Sync result: ${files}`);

fs.readdir('./', (err, files) => {
  result = err || files;
  console.log(`ASync result: ${result}`);
});
