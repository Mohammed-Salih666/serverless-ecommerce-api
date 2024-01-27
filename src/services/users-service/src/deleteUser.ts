import { APIGatewayProxyHandler, APIGatewayProxyEvent } from "aws-lambda";
import { deleteUser } from "src/controllers/userController";
import { User } from "src/database/user";
import { formatErrorResponse, formatJsonResponse } from "src/tools/responseFormatter";

export const main: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent) => {
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