const {getConnected, runQuery} = require('../database/dataPool');
const {farmerData,consumerData}= require('../database/authSqlCommands');




async function farmCredentials(req,res){
    const CATEGORY_TYPE = {farmer:'farmer',foodProcessor:'food processor'}

    const credentials ={
        categories:req.body.categories,
        productType:req.body.productType,
        businessAdd:req.body.businessAdd,
        city:req.body.city,
        state:req.body.state,
        phone:req.body.phone,
        connectReq:req.body.connectReq,
        customers_id:parseInt(req.body.customers_id) 
    
    }

const connection = await getConnected();
   try{
    if(!Object.values(CATEGORY_TYPE).includes(req.body.categories)) {
        res.status(400).json({message: "Invalid Category"})
        return
    }
            
   
    const result =  await runQuery(connection ,farmerData,
        [credentials.categories,
        credentials.productType,
        credentials.businessAdd,
        credentials.city,
        credentials.state,
        credentials.phone,
        credentials.connectReq,
        credentials.customers_id])

       res.status(200).json({message:"Farmer Data Saved Successfully"})
   }
        
   
   catch(err){
   console.log(err)
   }   
}


async function conCredentials(req,res){

    const credentials ={
        categories:req.body.categories,
        mailing_add:req.body.mailing_add,
        city:req.body.city,
        phone:req.body.phone,
        customers_id:parseInt(req.body.customers_id) 
    
    }

const connection = await getConnected();
   try{
           
    const result =  await runQuery(connection ,consumerData,
        [credentials.categories,
        credentials.mailing_add,
        credentials.city,
        credentials.phone,
        credentials.customers_id])

       res.status(200).json({message:"Consumer Data Saved Successfully"})
   }
        
   
   catch(err){
   console.log(err)
   }   
}



module.exports = {farmCredentials,conCredentials} 