const express = require("express");
const routerManager = express.Router();
const {createAccount,signin,resetPassword} = require("../controllers/auth.controllers");;
const {verifyAuth} = require("../middleware/authenticate");
const {uploadProd,product,getAllProducts,category,getAllCategories,upload} = require("../controllers/products")
const {farmCredentials,conCredentials} = require("../controllers/userController")






routerManager.post('/register',createAccount);
routerManager.post('/signin',signin);
routerManager.post('/passwordReset',resetPassword);
routerManager.post('/farmData',farmCredentials);
routerManager.post('/consData',conCredentials);
routerManager.post('/productUpload',upload,uploadProd);
routerManager.get('/products/:prodId',product);
routerManager.get('/products',getAllProducts);
routerManager.get('/category/:catId',category);
routerManager.get('/categories',getAllCategories);
routerManager.get('/details',verifyAuth);










module.exports={routerManager}