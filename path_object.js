const path = require('path');

const filename = __filename;
const pathObj = path.parse(filename);

console.log('============path object:============ ');
console.log(pathObj);
