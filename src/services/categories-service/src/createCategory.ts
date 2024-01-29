import { APIGatewayProxyHandler, APIGatewayProxyEvent } from "aws-lambda";
import { Category } from "src/database/category";
import { createCategory } from "src/controllers/categoryController";
import { formatErrorResponse, formatJsonResponse } from "src/tools/responseFormatter";
import * as middy from "middy";
import { validator } from "src/middleware/validator";
import { createCategoryRequest } from "src/request-schemas/category-requests";
import httpErrorHandler from "@middy/http-error-handler";

const createCategoryHandler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent) => {
    const data = JSON.parse(event.body);

    const name = data.name; 
    const isActive = data.isActive; 

    const category = new Category(name, isActive); 
    
    try {
        const res = await createCategory(category); 
        return formatJsonResponse(res); 
        
    } catch (error) {
        console.log(error); 
        return formatErrorResponse(error); 
    }

}

export const main = middy(createCategoryHandler)
.use(validator(createCategoryRequest))
.use(httpErrorHandler()); 