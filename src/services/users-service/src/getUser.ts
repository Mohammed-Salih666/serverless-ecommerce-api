import { APIGatewayProxyEvent, APIGatewayProxyHandler } from "aws-lambda";
import { getUser } from "src/controllers/userController";

export const main: APIGatewayProxyHandler = async(event: APIGatewayProxyEvent) => {
    try {
        const username = event.pathParameters.username; 
        
        const user = await getUser(username); 

        const response = {
            statusCode: 200, 
            body: JSON.stringify(user)
        }

        return response;

    } catch (error) {
        console.log(error); 
        const response = {
            statusCode: 500, 
            body: "Internal Server Error: " + error
        }

        return response;
    }
}
