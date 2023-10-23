const os = require('os');

const platform = os.platform();
const release = os.release();
const machine = os.machine();
const hostname = os.hostname();
const freeMemory = Math.floor(os.freemem() * 1.0 * Math.pow(10, -9), 3);
const totalMemory = Math.floor(os.totalmem() * 1.0 * Math.pow(10, -9), 3);
const uptime = os.uptime();
const version = os.version();

console.log('============ OS module:============ ');
console.log(`platform: ${platform}`);
console.log(`release: ${release}`);
console.log(`machine: ${machine}`);
console.log(`hostname: ${hostname}`);
console.log(`free Memory: ${freeMemory}`);
console.log(`total Memory: ${totalMemory}`);
console.log(`uptime: ${uptime}`);
console.log(`version: ${version}`);
