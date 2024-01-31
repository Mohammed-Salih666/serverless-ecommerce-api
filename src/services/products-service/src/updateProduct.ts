import httpErrorHandler from "@middy/http-error-handler";
import { APIGatewayProxyHandler, APIGatewayProxyEvent } from "aws-lambda";
import middy from '@middy/core'
import { updateProduct } from "src/controllers/productController";
import { validator } from "src/middleware/validator";
import { updateProductRequest } from "src/request-schemas/product-requests";

const updateProductHandler: APIGatewayProxyHandler = async(event: APIGatewayProxyEvent) => {
  
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

export const main = middy(updateProductHandler)
.use(validator(updateProductRequest))
.use(httpErrorHandler()); 