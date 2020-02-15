const bcrypt = require("bcrypt");
const saltRounds = 10;

// const encrypting = (password, callback) => {
//   console.log(password);
//   bcrypt.genSalt(saltRounds, function(err, salt) {
//     console.log(salt);
//     bcrypt.hash(password, salt, function(err, hash) {
//       return callback(err, hash);
//       // Store hash in your password DB.
//     });
//   });
// };
const encrypting = password => {
  console.log(password);
  return new Promise(function(resolve, reject) {
    bcrypt.genSalt(saltRounds, function(err, salt) {
      console.log({ salt, password });
      bcrypt.hash(password, salt, function(err, hash) {
        if (err) {
          console.log({ err });
          reject(err);
        } else {
          console.log({ hash });
          return resolve(hash);
        }
        // Store hash in your password DB.
      });
    });
  });
};

/**
 * 
 * @param {String} password 
 * @param {String} passwordHased 
 */
const comparePassword = (password, passwordHased) => {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, passwordHased, function(err, result) {
      //Result => true or false
      if(result) {
        resolve(result)
      } else {
        reject("Password Incorrect !")
      }
  });
  })
}
module.exports = {encrypting, comparePassword};
