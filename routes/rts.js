const express = require("express");
const routerManager = express.Router();
const {createAccount,signin,resetPassword} = require("../controllers/auth.controllers");;
const {verifyAuth} = require("../middleware/authenticate");




routerManager.post('/register',createAccount);
routerManager.get('/signin',signin);
routerManager.post('/passwordReset',resetPassword);


routerManager.get('/details',verifyAuth);









module.exports={routerManager}