import httpErrorHandler from "@middy/http-error-handler";
import { APIGatewayProxyHandler, APIGatewayProxyEvent } from "aws-lambda";
import middy from '@middy/core'
import { deleteCategory } from "src/controllers/categoryController";
import { Category } from "src/database/category";
import { validator } from "src/middleware/validator";
import { deleteCategoryRequest } from "src/request-schemas/category-requests";

const deleteCategoryHandler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent) => {
    const name: string = event.pathParameters.name; 

    try {
        const category: Category = await deleteCategory(name); 
        
        const response = {
            statusCode: 200, 
            body: JSON.stringify(category)
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

export const main = middy(deleteCategoryHandler)
.use(validator(deleteCategoryRequest))
.use(httpErrorHandler()); 