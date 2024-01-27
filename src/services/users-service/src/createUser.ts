import { APIGatewayProxyEvent, APIGatewayProxyHandler } from "aws-lambda";
import { createUser } from "src/controllers/userController";
import Address from "src/database/address";
import { User } from "src/database/user";
import { formatErrorResponse, formatJsonResponse } from "src/tools/responseFormatter";

export const main: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent) => {

    const data = JSON.parse(event.body); 

    const {username, name, email, password, address} = data;

    const user = new User(username, name, email, password, address);
    // const address: Address = {city: "city", district: "district", zipcode: "123"}
    // const user = new User('salih123', 'Mohammed Salih', 'a@b.c', '124354', address); 

    try {
        const res = await createUser(user); 
        return formatJsonResponse(res);
    } catch (error) {
        console.log(error); 
        return formatErrorResponse(error);
    }

}
