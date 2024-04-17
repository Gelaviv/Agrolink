const { getConnected, runQuery } = require('../database/dataPool');
const {option,prodUploadSchema} = require('../utils/utilities')
const {
  prodUpload,
  productById,
  allProducts,
  categoryById,
  allCategories,
} = require('../database/authSqlCommands');
const path = require('path');
const multer = require('multer');

const storage = multer.diskStorage({
  destination:'./uploads',
  filename:function(req,file,cb){
    cb(null,`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
  },
});

const upload =multer({
    storage:storage,

    limits:{
      fileSize:1000000
    },
    
}).single("image");





async function uploadProd(req, res) {

  const validateResult = prodUploadSchema.validate(req.body, option);
  if (validateResult.error) {
    return res.status(404).json({
      error: validateResult.error.details[0].message,
    });
  }

  const product = {
    productName: req.body.productName,
    category_id_fk: parseInt(req.body.category_id_fk),
    size: req.body.size,
    description: req.body.description,
    image: req.file.filename,
    price: req.body.price,
    quantity: req.body.quantity,
    discount: req.body.discount,
  };

  const connection = await getConnected();
  try {

    const result = await runQuery(connection, prodUpload, [
      product.productName,
      product.category_id_fk,
      product.size,
      product.description,
      product.image,
      product.price,
      product.quantity,
      product.discount,
    ]);

    return res.status(200).json({ message: "Product Upload Successful", product: result });
    
  } catch (err) {
    res.status(500).json({ message: "Invalid Upload" });
    console.log(err);
  }
}


//To get product by id

async function product(req, res) {
  const id = req.params.prodId;

  
  const connection = await getConnected();
  try {
    const res1 = await runQuery(connection, productById, [id]);

    res.status(200).json({ message: "Product Fetched", products: res1 });
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
    console.log(err);
  }
}



// To get all products
async function getAllProducts(req, res) {
  try {
    const connection = await getConnected();

    connection.query(allProducts, (err, result) => {
      if (err) {
        console.log(err);
        return res.status(404).json({ message: "Cannot get products" });
      } else {
        return res.status(200).json({
          message: "All products Fetched",
          data: result,
        });
      }
    });
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
    console.log(err);
  }
}




//To get category by id

async function category(req, res) {
  const category_id_fk = req.params.catId;

  
  const connection = await getConnected();
  try {
    const answer = await runQuery(connection, categoryById, [category_id_fk]);

    res.status(200).json({ message: "Category Fetched", data: answer });
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
    console.log(err);
  }
}


 // To get all the categories

async function getAllCategories(req, res) {
  try {
    const connection = await getConnected();

    connection.query(allCategories, (err, result) => {
      if (err) {
        console.log(err);
        return res.status(404).json({ message: "Cannot get category" });
      } else {
        return res.status(200).json({
          message: "Categories Fetched",
          data: result,
        });
      }
    });
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
    console.log(err);
  }
}




//The second code I wrote for the same purpose
// async function prodData(req, res) {
//     const connection = await getConnected();
//     try {
//         const answer = await runQuery(connection, prodInfo, []);
//         res.status(200).json({ message: "Products Fetched", products: answer });
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ message: "Internal Server Error" });
//     } finally {

//         if (connection) {
//             await connection.close();
//         }
//     }
// }

module.exports = {uploadProd,product,getAllProducts,category,getAllCategories,upload};
