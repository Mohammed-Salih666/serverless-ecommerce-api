import * as Joi from "joi";

export const createCategoryRequest = Joi.object({
    name: Joi.string().required(),
    isActive: Joi.boolean().required()
}); 

export const updateCategoryRequest = Joi.object({
    name: Joi.string().required(), 
    attribute: Joi.string().required(), 
    value: Joi.string().required()
}); 

export const deleteCategoryRequest = Joi.object({
    name: Joi.string().required()
});