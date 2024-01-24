import { APIGatewayProxyEvent, APIGatewayProxyHandler } from "aws-lambda";
import { createUser } from "src/controllers/userController";
import { User } from "src/database/user";

export const main: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent) => {

    const data = JSON.parse(event.body); 

    const {username, name, email, password, address} = data;

    const user = new User(username, name, email, password, address);
    // const address: Address = {city: "city", district: "district", zipcode: "123"}
    // const user = new User('batman123', 'Bruce Wayne', 'a@b.c', '124354', address); 

    try {
        const res = await createUser(user); 
        return {
            statusCode: 200, 
            body: JSON.stringify(res)
        }
    } catch (error) {
        console.log(error); 
        return {
            statusCode: 500, 
            body: "Internal Server Error: " + error
        }
    }

}
