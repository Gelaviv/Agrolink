//Import modules and packages
const express = require ('express');
const cors = require("cors");
const bodyParser = require('body-parser');
require('dotenv').config();
// console.log(process.env);
//import route
const {routerManager} = require("./routes/rts");
//create express object
const app = express();
const port = 5000 

//middlewares
app.use(cors());    //should always be the first middleware to write


//use middleware to run route
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use('/',routerManager);

//listen for port
app.listen(port,()=>{
    console.log(`server running on port ${port}`)
})