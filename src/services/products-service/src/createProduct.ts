import { APIGatewayProxyEvent, APIGatewayProxyHandler } from "aws-lambda";
import { createProduct } from "src/controllers/productController";
import {Product} from "src/database/product"; 

export const main: APIGatewayProxyHandler = async(event: APIGatewayProxyEvent) => {
    const data = JSON.parse(event.body); 

    const {name, price, category} = data; 

    const product = new Product(name, price, category); 

    try {
        const responseProduct = await createProduct(product); 
        const response = {
            statusCode: 200, 
            body: JSON.stringify(responseProduct)
        }
        return response; 
    } catch (error) {
        console.log(error);
        const response = {
            statusCode: 500, 
            body: error
        }
        return response;
    }
}