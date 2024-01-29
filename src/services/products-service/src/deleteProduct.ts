import httpErrorHandler from "@middy/http-error-handler";
import { APIGatewayProxyHandler, APIGatewayProxyEvent } from "aws-lambda";
import * as middy from "middy";
import { deleteProduct } from "src/controllers/productController";
import { Product } from "src/database/product";
import { validator } from "src/middleware/validator";
import { deleteProductRequest } from "src/request-schemas/product-requests";

const deleteProductHandler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent) => {
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

export const main = middy(deleteProductHandler)
.use(validator(deleteProductRequest))
.use(httpErrorHandler()); 