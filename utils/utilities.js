const Joi = require("joi")

 const option = {
    abortEarly: false,
    errors: {
      wrap: {
        label: "",
      },
    },
  };

   const registerSchema = Joi.object().keys({
    fullname:Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().pattern(new RegExp("[a-zA-Z0-9]{3,30}$")),
    user_type:Joi.string().required()
    
  });

const signInSchema = Joi.object().keys({
    email:Joi.string().email().required(),
    password:Joi.string().required()
})

const farmDataSchema =({
    categories:Joi.string().required(),
    productType:Joi.string().required(),
    businessAdd:Joi.string().required(),
    city:Joi.string().required(),
    state:Joi.string().required(),
    phone:Joi.number().required(),
    connectReq:Joi.string().required(),
    customers_id:Joi.number().required()
})
        
const consDataSchema =({
  categories:Joi.string().required(),
  mailing_add:Joi.string().required(),
  city:Joi.string().required(),
  phone:Joi.number().required(),
  customers_id:Joi.number().required()
})

const prodUploadSchema = Joi.object().keys({
  productName:Joi.string().required(),
  category_id_fk: Joi.number().required(),
  size: Joi.string().required(),
  description: Joi.string(),
  image:Joi.string().valid('image/jpeg','image/jpg', 'image/png', 'image/gif'),
  price: Joi.number().required(),
  quantity: Joi.number().required(),
  discount:Joi.string()
});




module.exports={
  option,
  registerSchema,
  signInSchema,
  farmDataSchema,
  consDataSchema,
  prodUploadSchema
}
   