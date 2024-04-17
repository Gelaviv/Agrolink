const createAccSyntax = "insert into customers(fullname,email,password,user_type)values(?,?,?,?)";
const signInSyntax = "select * from customers where lower(email) = lower(?) ";
const passwordResetSyntax = "update customers set password = ? where email = ?";
const exUserSyntax = "select * from customers where lower(email) = lower(?) ";
const farmerData = "insert into farmer(categories,productType,businessAdd,city,state,phone,connectReq,customers_id)values(?,?,?,?,?,?,?,?)";
const consumerData = "insert into consumer(categories,mailing_add,city,phone,customers_id)values(?,?,?,?,?)";
const prodUpload = "insert into products(productName,category_id_fk,size,description,image,price,quantity,discount)values(?,?,?,?,?,?,?,?)";
const productById = "select * from products where id = ?";
const allProducts = "select * from products";
const categoryById = "select * from products where category_id_fk = ?";
const allCategories = "select * from category";





module.exports ={createAccSyntax,
    signInSyntax,
    passwordResetSyntax,
    exUserSyntax,
    farmerData,
    consumerData,
    prodUpload,
    productById,
    allProducts,
    categoryById,
    allCategories,
 
}