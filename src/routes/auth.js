const express = require("express");
const router = express.Router();
const authController = require("../controllers/AuthController");
router.get("/signup", authController.signup);
router.post("/signup/addUser", authController.addUser);
router.post("/login/checkLogin", authController.checkLogin);
router.get("/login", authController.login);

module.exports = router;
