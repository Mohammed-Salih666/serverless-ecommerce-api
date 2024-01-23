import { APIGatewayProxyHandler, APIGatewayProxyEvent } from "aws-lambda";
import { deleteUser } from "src/controllers/userController";
import { User } from "src/database/user";

export const main: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent) => {
    const username: string = event.pathParameters.username; 

    try {
        const user: User = await deleteUser(username); 
        
        const response = {
            statusCode: 200, 
            body: JSON.stringify(user)
        }

        return response;
    } catch (error) {
        console.log(error); 
        const response = {
            statusCode: 500, 
            body: "Internal Server Error. " + error
        }

        return response;
    }
}