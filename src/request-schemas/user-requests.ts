import * as Joi from "joi";

export const createUserRequest = Joi.object({
    username: Joi.string().required(), 
    name: Joi.string().required(), 
    email: Joi.string().email().required(), 
    password: Joi.string().required(), 
    address: Joi.object()
}); 

export const updateUserRequest = Joi.object({
    username: Joi.string().required(), 
    attribute: Joi.string().required(), 
    value: Joi.string().required()
}); 

export const deleteUserRequest = Joi.object({
    username: Joi.string().required()
});