import middy from "@middy/core";
import httpErrorHandler from "@middy/http-error-handler";
import { APIGatewayProxyEvent, APIGatewayProxyHandler } from "aws-lambda";
import { formatErrorResponse, formatJsonResponse } from "src/tools/responseFormatter";
import { publishToTopic } from "src/notification/subscription";

const publishHandler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent) => {
    const body = JSON.parse(event.body); 

    const {topicArn, publishedEvent} = body; 

    try {
        const response = await publishToTopic(topicArn, publishedEvent);  
        return formatJsonResponse(response); 
    } catch (error) {
        return formatErrorResponse(error);
    }
}

export const main = middy(publishHandler).use(httpErrorHandler()); 