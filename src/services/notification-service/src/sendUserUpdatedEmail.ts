import middy from "@middy/core";
import httpErrorHandler from "@middy/http-error-handler";
import { APIGatewayProxyEvent, APIGatewayProxyHandler } from "aws-lambda";
import { sendUserUpdatedEmail } from "src/notification/userUpdated";
import { formatErrorResponse, formatJsonResponse } from "src/tools/responseFormatter";

const sendEmailHandler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent) => {
    
    const body = JSON.parse(event.body); 

    const {addresses, updatedAttribute, newValue} = body; 

    try {
        const response = await sendUserUpdatedEmail(addresses, updatedAttribute, newValue); 
        return formatJsonResponse(response);
    } catch (error) {
        formatErrorResponse(error);
    }
}

export const main = middy(sendEmailHandler).use(httpErrorHandler());