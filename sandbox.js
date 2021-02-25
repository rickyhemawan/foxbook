const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);
const hash = bcrypt.hashSync("apple", salt);
console.log(bcrypt.compareSync("apple", hash));