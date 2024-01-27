import { APIGatewayProxyHandler, APIGatewayProxyEvent } from "aws-lambda";
import { updateUser } from "src/controllers/userController";
import { formatErrorResponse, formatJsonResponse } from "src/tools/responseFormatter";

export const main: APIGatewayProxyHandler = async(event: APIGatewayProxyEvent) => {
  
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