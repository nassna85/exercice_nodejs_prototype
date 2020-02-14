const bcrypt = require("bcrypt");
const saltRounds = 10;

const cryptPassword = password => {
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, saltRounds, (err, hash) => {
      if (hash) {
        return resolve(hash);
      } else {
        return reject("Problème lors du hashage du mot de passe !");
      }
    });
  });
};

const decryptPassword = (password, hash) => {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, hash, (err, result) => {
      if (result) {
        return resolve(result);
      } else {
        return reject("Password Incorrect !");
      }
    });
  });
};

module.exports = {
  cryptPassword,
  decryptPassword
};
