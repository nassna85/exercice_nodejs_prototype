const express = require("express");
const router = express.Router();
const { checkAuthenticated } = require("../config/auth");

const userController = require("../controllers/usersController");

router.get("/", userController.index);

router.post("/new", userController.new);

router.get("/login", userController.login);

router.get("/logout", userController.logout);

router.post("/login", userController.postLogin);

router.get("/:id", userController.show);

router.put("/:id/edit", userController.edit);

router.get("/:id/cart", checkAuthenticated, userController.showByCart);

router.delete("/:id/delete", userController.destroy);

module.exports = router;
