const bcrypt = require('bcrypt');
const {getConnected, runQuery} = require('../database/dataPool')
const {createAccSyntax,signInSyntax,passwordResetSyntax}= require('../database/authSqlCommands');
const jwt = require('jsonwebtoken');
const secret = "agrolink"

const USER_TYPE = {farmer:'farmer',consumer:'consumer'}

async function createAccount(req,res){
    const bcSaltRounds = await bcrypt.genSalt(10);
    // console.log({bcSaltRounds, pass: req.body.password})

    const credentials ={
        fullname :req.body.fullname,
        email :req.body.email,
        password : bcrypt.hashSync(req.body.password,bcSaltRounds),
        user_type : req.body.user_type
    
    }

const connection = await getConnected();
   try{
    if(!Object.keys(USER_TYPE).includes(req.body.user_type)) {
        res.status(400).json({message: "Invalid UserType"})
    }
    if (!req.body.fullname || !req.body.email || !req.body.password) {
        res.status(400).json({message: "Invalid Credentials"})
    }
   const result =  await runQuery(connection ,createAccSyntax,[credentials.fullname,credentials.email,credentials.password,credentials.user_type])
   res.status(200).json({message:"Account created successfully"})
   }
   catch(err){
   console.log(err)
   }   
}
   

const signin = async(req,res)=>{
    const credentials = {
        email: req.body.email,
        password: req.body.password
    }
    const connection = await getConnected();
   try{
   const result =  await runQuery(connection ,signInSyntax,[credentials.email])
   const vfy = await bcrypt.compare(credentials.password,result[0].password)
   if (vfy){
    const token = jwt.sign(credentials,secret)
    res.status(200).json({message:result,token})
    console.log(token)
   }
   else{
    res.status(403).json({message:'Invalid SignIn Credentials'})
   }
   
   }
   catch(err){
   console.log(err)
   }   
}


   async function resetPassword(req,res){
    const bcSaltRounds = await bcrypt.genSalt(10);
    const credentials = {
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password,bcSaltRounds)
    }


    const connection = await getConnected();
   try{
    const res1 =  await runQuery(connection ,signInSyntax,[credentials.email])
    if(res1){
        const result =  await runQuery(connection ,passwordResetSyntax,[credentials.email,credentials.password])
        res.status(200).json({message:result})
    }
   
   }
   catch(err){
   console.log(err)
   }   
   }





module.exports = {createAccount,signin,resetPassword}