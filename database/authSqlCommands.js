const createAccSyntax = "insert into customers(fullname,email,password,user_type)values(?,?,?,?)";
const signInSyntax = "select * from customers where email = ? ";
const passwordResetSyntax = "update customers set password = ? where email = ?";









module.exports ={createAccSyntax,signInSyntax,passwordResetSyntax}