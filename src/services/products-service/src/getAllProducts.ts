import { APIGatewayProxyHandler } from "aws-lambda";
import { getAllProducts } from "src/controllers/productController";
import { Product } from "src/database/product";

export const main: APIGatewayProxyHandler = async() => {
    try {
        const product: Product[] = await getAllProducts(); 
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
        return response
    }
}