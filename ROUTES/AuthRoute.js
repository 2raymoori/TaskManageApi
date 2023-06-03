const express = require('express');
const { login } = require('../CONTROLLERS/AuthCtrl');
const authenticate = require('../MiddleWare/auth');
const {check} = require("express-validator/check");
const Router = express.Router();



Router.post("/login",[
    check("password","Sorry a Valid password is required").exists(),
    check("email","Sorry a Valid email is required").isEmail()
],login);



module.exports = Router

