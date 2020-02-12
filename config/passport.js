const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/User");

const initialize = passport => {
  //Function authenticateUser => Verify data of user
  const authenticateUser = (email, password, done) => {
    const user = new User();
    //Step 1 : Check if email exist or no
    user.findByEmail(email, (error, user) => {
      if (error) throw error;
      //console.log(user);
      //Step 2 : If email not exist (user[0] because return a array)
      if (!user[0]) {
        return done(null, false, { message: "Email don't exist !" });
      }
      //Step 3 : If email exist, check the password
      if (password === user[0].password) {
        //console.log(user[0].password);
        return done(null, user); //user => it's user authentificated
      } else {
        return done(null, false, { message: "Password Incorrect !" });
      }
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
