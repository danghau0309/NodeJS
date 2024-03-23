const express = require("express");
const router = express.Router();
const authController = require("../controllers/AuthController");
router.get("/signup", authController.signup);
router.get("/logout", authController.logout);
router.post("/signup/addUser", authController.addUser);
router.post("/login/handleLogin", authController.login);
router.get("/login", authController.renderLogin);

module.exports = router;
