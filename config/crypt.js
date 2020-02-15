const bcrypt = require('bcrypt');
const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';
const someOtherPlaintextPassword = 'not_bacon';

const encrypting = (password, callback) => {
    console.log(password)
    bcrypt.genSalt(saltRounds, function(err, salt) {
        console.log(salt)
        bcrypt.hash(password, salt, function(err, hash) {
            return callback(err, hash)
            // Store hash in your password DB.
        });
    }); 
}


module.exports = encrypting


  
