import { APIGatewayProxyHandler } from "aws-lambda";
import { getAllUsers } from "src/controllers/userController";
import { User } from "src/database/user";

export const main: APIGatewayProxyHandler = async() => {
    try {
        const users: User[] = await getAllUsers(); 
        const response = {
            statusCode: 200, 
            body: JSON.stringify(users)
        }
        return response;
    } catch (error) {
        console.log(error); 
        const response = {
            statusCode: 500, 
            body: "Internal Server Error: " + error
        }
        return response
    }
}