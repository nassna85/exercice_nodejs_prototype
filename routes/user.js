const express = require("express");
const router = express.Router();
const passport = require('passport');

const userController = require("../controllers/usersController");

router.get("/", userController.index);

router.post("/new", userController.new);

router.get("/:id", userController.show);

router.post("/login",passport.authenticate('local', { failureRedirect: '/login' }), userController.login);

router.put("/:id/edit", userController.edit);

router.get("/:id/cart", userController.showByCart);

router.delete("/:id/delete", userController.destroy);

module.exports = router;
/*
app.post('/login', 
  passport.authenticate('local', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
  });*/
