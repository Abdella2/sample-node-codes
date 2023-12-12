const bcrypt = require('bcrypt');

async function hash(password) {
  const salt = await bcrypt.genSalt(10);
  const hashed = await bcrypt.hash(password, salt);
  console.log(salt);
  console.log(hashed);
}

hash('pass123');
