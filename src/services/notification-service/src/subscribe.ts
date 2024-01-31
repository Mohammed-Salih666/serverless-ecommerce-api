import middy from "@middy/core";
import httpErrorHandler from "@middy/http-error-handler";
import { APIGatewayProxyEvent, APIGatewayProxyHandler } from "aws-lambda";
import { formatErrorResponse, formatJsonResponse } from "src/tools/responseFormatter";
import { subscribeToTopic } from "src/notification/subscription";

const subscribeHandler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent) => {
    const body = JSON.parse(event.body); 

    const {topicArn, endpoint} = body; 

    try {
        const response = await subscribeToTopic(topicArn, endpoint); 
        return formatJsonResponse(response); 
    } catch (error) {
        return formatErrorResponse(error);
    }
}

export const main = middy(subscribeHandler).use(httpErrorHandler()); 