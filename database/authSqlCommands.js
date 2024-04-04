const createAccSyntax = "insert into customers(fullname,email,password,user_type)values(?,?,?,?)";
const signInSyntax = "select * from customers where lower(email) = lower(?) ";
const passwordResetSyntax = "update customers set password = ? where email = ?";
const exUserSyntax = "select * from customers where lower(email) = lower(?) ";
const farmerData = "insert into farmer(categories,productType,businessAdd,city,state,phone,connectReq,customers_id)values(?,?,?,?,?,?,?,?)";
const consumerData = "insert into consumer(categories,mailing_add,city,phone,customers_id)values(?,?,?,?,?)";






module.exports ={createAccSyntax,signInSyntax,passwordResetSyntax,exUserSyntax,farmerData,consumerData}