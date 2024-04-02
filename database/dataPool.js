const mySql = require('mysql2');


//store database credentials
const connect = mySql.createPool({
    connectionLimit: 10,
    host:process.env.HOST,
    user:process.env.DATABASE_USER,
    database:process.env.DATABASE,
    password:process.env.PASSWORD,
});


//create function to connect to database
const getConnected =()=>{
return new Promise((resolve,reject)=>{
    connect.getConnection(function(err, connection){
        if(err){
        reject(err);
        }else{
            resolve(connection);
        }
    
    })
})
}

//create a function to run queries
const runQuery = (connection,sqlQuery,values)=>{
    return new Promise((resolve, reject)=>{
        connection.query(sqlQuery,values,(err,result)=>{
            if(err){
                reject(err);
                }
                else{
                    resolve(result);
                }
        })
    })
}



module.exports = {getConnected, runQuery};