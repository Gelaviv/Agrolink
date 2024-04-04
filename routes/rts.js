const express = require("express");
const routerManager = express.Router();
const {createAccount,signin,resetPassword} = require("../controllers/auth.controllers");;
const {verifyAuth} = require("../middleware/authenticate");
const {farmCredentials,conCredentials} = require("../controllers/userController")






routerManager.post('/register',createAccount);
routerManager.get('/signin',signin);
routerManager.post('/passwordReset',resetPassword);
routerManager.post('/farmData',farmCredentials);
routerManager.post('/consData',conCredentials);
routerManager.get('/details',verifyAuth);









module.exports={routerManager}