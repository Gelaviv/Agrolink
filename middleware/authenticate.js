const jwt = require('jsonwebtoken');
const verifyAuth = (req,res, next)=>{
const bearer = req.headers["authorization"]
if (typeof bearer =="undefined"){
    res.status(403).json({message:"Unauthorized User"})
}else{
    try{
const fullbearer = bearer.split(' ');
req.webToken = fullbearer[1];
req.decoded = jwt.verify(fullbearer[1],"agrolink")
console.log(req.decoded)

    }
    catch(err){
        res.status(403).json({message:"Invalid Token"})
    }
}

console.log(bearer)
next()
}
module.exports={verifyAuth}