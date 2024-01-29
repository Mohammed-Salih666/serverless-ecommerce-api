import httpErrorHandler from "@middy/http-error-handler";
import { APIGatewayProxyHandler, APIGatewayProxyEvent } from "aws-lambda";
import * as middy from "middy";
import { deleteUser } from "src/controllers/userController";
import { User } from "src/database/user";
import { validator } from "src/middleware/validator";
import { deleteUserRequest } from "src/request-schemas/user-requests";
import { formatErrorResponse, formatJsonResponse } from "src/tools/responseFormatter";


const deleteUserHandler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent) => {
    const username: string = event.pathParameters.username; 

    try {
        const user: User = await deleteUser(username); 
        
        const response = formatJsonResponse(user); 
        return response;
    } catch (error) {
        console.log(error); 
        const response = formatErrorResponse(error);
        return response;
    }
}

export const main = middy(deleteUserHandler)
.use(validator(deleteUserRequest))
.use(httpErrorHandler());