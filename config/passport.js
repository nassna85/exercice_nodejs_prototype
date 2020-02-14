const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/User");
const { decryptPassword } = require("../services/crypt_password");

const initialize = passport => {
  //Function authenticateUser => Verify data of user
  const authenticateUser = (email, password, done) => {
    const user = new User();
    //Step 1 : Check if email exist or no
    //Change paramater user by checkUser
    user.findByEmail(email, (error, checkUser) => {
      if (error) throw error;
      //console.log(checkUser);
      //Step 2 : If email not exist (checkUser[0] because return a array)
      if (!checkUser[0]) {
        return done(null, false, { message: "Email don't exist !" });
      }
      //Step 3 : If email exist, check the password
      decryptPassword(password, checkUser[0].password)
        .then(value => {
          // value correspond à la valeur de resolve (true or false) => La valeur que resolve est censé avoir est true car je lui ai donné cette valeur sinon => catch !
          console.log({ decryptPasswordValue: value });
          if (value) return done(null, checkUser);
        })
        .catch(err => {
          //err correspond a la valeur de reject
          return done(null, false, { message: err });
        });
      /*
      if (password === checkUser[0].password) {
        //console.log(checkUser[0].password);
        return done(null, checkUser); //checkUser => it's checkUser authentificated
      } else {
        return done(null, false, { message: "Password Incorrect !" });
      }
      */
    });
  };
  //Define Localstrategy with email
  passport.use(new LocalStrategy({ usernameField: "email" }, authenticateUser));

  /* 
    Understand serializeUSer and deserializeUser :
    https://stackoverflow.com/questions/27637609/understanding-passport-serialize-deserialize
  */
  passport.serializeUser((user, done) => {
    done(null, user[0].id);
  });
  passport.deserializeUser((id, done) => {
    const user = new User();
    user.findById(id, (error, user) => {
      done(error, user);
    });
  });
};

module.exports = initialize;
