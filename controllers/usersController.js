const User = require("../models/User");
const passport = require("passport");

module.exports = {
  new: (req, res) => {
    const dataUser = req.body;
    const user = new User();
    user.checkInput(dataUser, (error, result) => {
      if (error) throw error;
      res.json(dataUser);
    });
  },

  index: (req, res) => {
    const user = new User();
    user.findAllUsersWithAddress((error, users) => {
      if (error) throw error;
      res.json(users);
    });
  },

  showByCart: (req, res) => {
    const userID = req.params.id;
    const user = new User();
    user.findCartByUser(userID, (error, user) => {
      if (error) throw error;
      res.json(user);
    });
  },

  show: (req, res) => {
    const userID = req.params.id;
    const user = new User();
    user.findById(userID, (error, user) => {
      if (error) throw error;
      res.json(user);
    });
  },

  edit: (req, res) => {
    const userID = req.params.id;
    const dataUser = req.body;
    const user = new User();
    user.update(userID, dataUser, (error, result) => {
      if (error) throw error;
      res.json(dataUser);
    });
  },

  destroy: (req, res) => {
    const userID = req.params.id;
    const user = new User();
    user.delete(userID, (error, result) => {
      if (error) throw error;
      res.json({ success: "User is deleted" });
    });
  },
  //Page Login => GET
  login: (req, res) => {
    res.send("Page Login");
  },

  logout: (req, res) => {
    req.logout();
    res.status(201).json({ success: "You are logged out !" });
  },

  //Page Login => POST
  postLogin: (req, res) => {
    /* https://stackoverflow.com/questions/49030707/how-to-send-json-data-under-passport-local-strategy
     */
    passport.authenticate("local", (err, user, info) => {
      if (err) {
        res.status(404).json(err);
        return;
      }
      //Data User Incorrect => get Info Error (In config/passport)
      if (!user) {
        return res.status(401).json(info);
      }

      /*
        https://stackoverflow.com/questions/57293115/passport-deserializeuser-not-being-called
      */
      //Data User Correct => Save user in session
      req.login(user, err => {
        if (err) {
          res.status(500).json({ message: "Session save went bad." });
          return;
        }
        res.status(200).json({
          success: "Authenticated",
          user: user
        });
      });
    })(req, res);
  }
};
