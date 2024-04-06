const bcrypt = require('bcrypt');
const {getConnected, runQuery} = require('../database/dataPool')
const {createAccSyntax,signInSyntax,passwordResetSyntax,exUserSyntax}= require('../database/authSqlCommands');
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
        return
    }
    if (!req.body.fullname || !req.body.email || !req.body.password) {
        res.status(400).json({message: "Invalid Credentials"})
        return
    }
    const existingUser = await runQuery(connection,exUserSyntax,[credentials.email])
    if (existingUser[0]){
        res.status(400).json({message: "Email already exists"})
        return
    }
    
   const result =  await runQuery(connection ,createAccSyntax,[credentials.fullname,credentials.email,credentials.password,credentials.user_type])
   console.log(result)
   res.status(200).json({message:"Account created successfully",user_type:req.body.user_type,user_id:result.insertId})
   return
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
    return
    console.log(token)
    return
    
   }
   else{
    res.status(403).json({message:'Invalid SignIn Credentials'})
    return
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
const signInResult = await runQuery(connection, signInSyntax, [credentials.email]);
    if (signInResult.length > 0) {
      // Execute the UPDATE query to reset the password
      const result = await runQuery(connection, passwordResetSyntax, [credentials.password, credentials.email]);
      res.status(200).json({ message: result});
      return
    } else {
      res.status(404).json({ message: 'Email not found' });
      return
    }

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}





module.exports = {createAccount,signin,resetPassword}