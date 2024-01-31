import httpErrorHandler from "@middy/http-error-handler";
import { APIGatewayProxyHandler, APIGatewayProxyEvent } from "aws-lambda";
import middy from '@middy/core';
import { updateUser } from "src/controllers/userController";
import { validator } from "src/middleware/validator";
import { updateUserRequest } from "src/request-schemas/user-requests";
import { formatErrorResponse, formatJsonResponse } from "src/tools/responseFormatter";

const updateUserHandler: APIGatewayProxyHandler = async(event: APIGatewayProxyEvent) => {
  
    const data = JSON.parse(event.body); 
    const username = event.pathParameters.username; 
    const {attribute, value} = data ;

    try {
        const user = await updateUser(username, attribute, value);
        return formatJsonResponse(user);
    } catch (error) {
        console.log(error); 
        return formatErrorResponse(error); 
    }
}

export const main = middy(updateUserHandler)
.use(validator(updateUserRequest))
.use(httpErrorHandler()); 