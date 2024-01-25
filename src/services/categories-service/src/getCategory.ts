import { APIGatewayProxyHandler, APIGatewayProxyEvent } from "aws-lambda";
import { getCategory } from "src/controllers/categoryController";


export const main: APIGatewayProxyHandler = async(event: APIGatewayProxyEvent) => {
    try {
        const name = event.pathParameters.name; 
        
        const category = await getCategory(name); 

        const response = {
            statusCode: 200, 
            body: JSON.stringify(category)
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
