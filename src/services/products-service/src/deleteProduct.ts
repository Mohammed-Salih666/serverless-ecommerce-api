import { APIGatewayProxyHandler, APIGatewayProxyEvent } from "aws-lambda";
import { deleteProduct } from "src/controllers/productController";
import { Product } from "src/database/product";

export const main: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent) => {
    const name: string = event.pathParameters.name; 

    try {
        const product: Product = await deleteProduct(name); 
        
        const response = {
            statusCode: 200, 
            body: JSON.stringify(product)
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