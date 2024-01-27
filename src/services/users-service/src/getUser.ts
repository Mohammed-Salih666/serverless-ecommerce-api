import { APIGatewayProxyEvent, APIGatewayProxyHandler } from "aws-lambda";
import { getUser } from "src/controllers/userController";
import { formatErrorResponse, formatJsonResponse } from "src/tools/responseFormatter";

export const main: APIGatewayProxyHandler = async(event: APIGatewayProxyEvent) => {
    try {
        const username = event.pathParameters.username; 
        
        const user = await getUser(username); 

        return formatJsonResponse(user);

    } catch (error) {
        console.log(error); 
        return formatErrorResponse(error);
    }
}
