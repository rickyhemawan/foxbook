// just like the file name said
// this used only for testing packages usage
// Doesnt affect application in any possible way

const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);
const hash = bcrypt.hashSync("apple", salt);
console.log(bcrypt.compareSync("apple", hash));