import { APIGatewayProxyHandler, APIGatewayProxyEvent } from "aws-lambda";
import { updateUser } from "src/controllers/userController";

export const main: APIGatewayProxyHandler = async(event: APIGatewayProxyEvent) => {
  
    const data = JSON.parse(event.body); 
    const username = event.pathParameters.username; 
    const {attribute, value} = data ;

    try {
        const user = await updateUser(username, attribute, value);
        return {
            statusCode: 200, 
            body: JSON.stringify(user)
        }
    } catch (error) {
        console.log(error); 
        return {
            statusCode: 500,
            body: "Internal Server Error: " + error
        }
    }
}