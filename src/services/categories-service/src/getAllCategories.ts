import { APIGatewayProxyHandler } from "aws-lambda";
import { getAllCategories } from "src/controllers/categoryController";
import { Category } from "src/database/category";

export const main: APIGatewayProxyHandler = async() => {
    try {
        const category: Category[] = await getAllCategories(); 
        const response = {
            statusCode: 200, 
            body: JSON.stringify(category)
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