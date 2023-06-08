const express = require("express");
const { login, updatePassword } = require("../CONTROLLERS/AuthCtrl");
const authenticate = require("../MiddleWare/auth");
const { check } = require("express-validator/check");
const Router = express.Router();

Router.post(
  "/login",
  [
    check("password", "Sorry a Valid password is required").exists(),
    check("email", "Sorry a Valid email is required").isEmail(),
  ],
  login
);
Router.put(
  "/updatepassword",
  [
    [
      check("oldPassword", "Sorry Please provide your old password").exists(),
      check("newPassword", "Sorry Please provide your new password").exists(),
    ],
    authenticate,
  ],
  updatePassword
);
module.exports = Router;
