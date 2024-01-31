import httpErrorHandler from "@middy/http-error-handler";
import { APIGatewayProxyEvent, APIGatewayProxyHandler } from "aws-lambda";
import middy from '@middy/core'
import { createProduct } from "src/controllers/productController";
import {Product} from "src/database/product"; 
import { validator } from "src/middleware/validator";
import { createproductRequest } from "src/request-schemas/product-requests";

const createProductHandler: APIGatewayProxyHandler = async(event: APIGatewayProxyEvent) => {
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

export const main = middy(createProductHandler)
.use(validator(createproductRequest))
.use(httpErrorHandler()); 