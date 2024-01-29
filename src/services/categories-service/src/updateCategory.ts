import httpErrorHandler from "@middy/http-error-handler";
import { APIGatewayProxyHandler, APIGatewayProxyEvent } from "aws-lambda";
import { updateCategory } from "src/controllers/categoryController";
import { validator } from "src/middleware/validator";
import { updateCategoryRequest } from "src/request-schemas/category-requests";

const updateCategoryHandler: APIGatewayProxyHandler = async(event: APIGatewayProxyEvent) => {
  
    const data = JSON.parse(event.body); 
    const name = event.pathParameters.name; 
    const {attribute, value} = data ;

    try {
        const category = await updateCategory(name, attribute, value);
        return {
            statusCode: 200, 
            body: JSON.stringify(category)
        }
    } catch (error) {
        console.log(error); 
        return {
            statusCode: 500,
            body: "Internal Server Error: " + error
        }
    }
}

export const main = middy(updateCategoryHandler)
.use(validator(updateCategoryRequest))
.use(httpErrorHandler); 