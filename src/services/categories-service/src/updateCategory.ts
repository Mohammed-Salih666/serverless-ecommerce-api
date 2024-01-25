import { APIGatewayProxyHandler, APIGatewayProxyEvent } from "aws-lambda";
import { updateCategory } from "src/controllers/categoryController";

export const main: APIGatewayProxyHandler = async(event: APIGatewayProxyEvent) => {
  
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