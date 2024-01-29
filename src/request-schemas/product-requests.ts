import * as Joi from "joi";

export const createproductRequest = Joi.object({
    name: Joi.string().required(), 
    price: Joi.number().required(), 
    category: Joi.string().required(), 
    images: Joi.array()
});

export const updateProductRequest = Joi.object({
    name: Joi.string().required(), 
    attribute: Joi.string().required(),
    value: Joi.string().required()
})

export const deleteProductRequest = Joi.object({
    name: Joi.string().required()
})