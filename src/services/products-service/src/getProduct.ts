import { APIGatewayProxyHandler, APIGatewayProxyEvent } from "aws-lambda";
import { getProduct } from "src/controllers/productController";


export const main: APIGatewayProxyHandler = async(event: APIGatewayProxyEvent) => {
    try {
        const name = event.pathParameters.name; 
        
        const product = await getProduct(name); 

        const response = {
            statusCode: 200, 
            body: JSON.stringify(product)
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
