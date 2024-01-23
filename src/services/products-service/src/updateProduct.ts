import { APIGatewayProxyHandler, APIGatewayProxyEvent } from "aws-lambda";
import { updateProduct } from "src/controllers/productController";

export const main: APIGatewayProxyHandler = async(event: APIGatewayProxyEvent) => {
  
    const data = JSON.parse(event.body); 
    const name = event.pathParameters.name; 
    const {attribute, value} = data ;

    try {
        const product = await updateProduct(name, attribute, value);
        return {
            statusCode: 200, 
            body: JSON.stringify(product)
        }
    } catch (error) {
        console.log(error); 
        return {
            statusCode: 500,
            body: "Internal Server Error: " + error
        }
    }
}