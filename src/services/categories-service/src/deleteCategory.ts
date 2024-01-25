import { APIGatewayProxyHandler, APIGatewayProxyEvent } from "aws-lambda";
import { deleteCategory } from "src/controllers/categoryController";
import { Category } from "src/database/category";

export const main: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent) => {
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