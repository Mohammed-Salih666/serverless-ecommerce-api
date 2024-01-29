import { APIGatewayProxyEvent, APIGatewayProxyHandler } from "aws-lambda";
import { createUser } from "src/controllers/userController";
import { User } from "src/database/user";
import { formatErrorResponse, formatJsonResponse } from "src/tools/responseFormatter";
import middy from '@middy/core';
import httpErrorHandler from "@middy/http-error-handler";
import { validator } from "src/middleware/validator";
import { createUserRequest } from "src/request-schemas/user-requests";

const createUserHandler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent) => {

    const data = JSON.parse(event.body); 
    console.log(data);

    const {username, name, email, password} = data;

    const user = new User(username, name, email, password);
    // const address: Address = {city: "city", district: "district", zipcode: "123"}
    // const user = new User('salih123', 'Mohammed Salih', 'a@b.c', '124354', address); 

    try {
        const res = await createUser(user); 
        return formatJsonResponse(res);
    } catch (error) {
        console.log(error); 
        return formatErrorResponse(error);
    }

}

export const main = middy(createUserHandler)
.use(validator(createUserRequest))
.use(httpErrorHandler());