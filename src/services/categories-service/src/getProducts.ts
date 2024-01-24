import { APIGatewayProxyEvent, APIGatewayProxyHandler } from "aws-lambda";
import { getProducts } from "src/controllers/categoryController";

export const main: APIGatewayProxyHandler = async(event: APIGatewayProxyEvent) => {
    try {
        const name = event.pathParameters.name; 
        
        const products = await getProducts(name); 

        const response = {
            statusCode: 200, 
            body: JSON.stringify(products)
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
