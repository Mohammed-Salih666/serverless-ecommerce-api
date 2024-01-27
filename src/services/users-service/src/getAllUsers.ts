import { APIGatewayProxyHandler } from "aws-lambda";
import { getAllUsers } from "src/controllers/userController";
import { User } from "src/database/user";
import { formatErrorResponse, formatJsonResponse } from "src/tools/responseFormatter";

export const main: APIGatewayProxyHandler = async() => {
    try {
        const users: User[] = await getAllUsers(); 
        return formatJsonResponse(users);
    } catch (error) {
        console.log(error); 
        return formatErrorResponse(error);
    }
}