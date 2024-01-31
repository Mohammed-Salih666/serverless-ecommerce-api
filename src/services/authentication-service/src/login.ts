import middy from "@middy/core";
import httpErrorHandler from "@middy/http-error-handler";
import { APIGatewayProxyEvent, APIGatewayProxyHandler } from "aws-lambda";
import {CognitoIdentityServiceProvider} from 'aws-sdk';
import { formatErrorResponse, formatJsonResponse } from "src/tools/responseFormatter";

const loginHandler: APIGatewayProxyHandler = async(event: APIGatewayProxyEvent) => {
    const body = JSON.parse(event.body); 

    const {email, password} = body; 

    const cognito = new CognitoIdentityServiceProvider() ;

    try {
        const params = {
            AuthFlow: "ADMIN_NO_SRP_AUTH", 
            UserPoolId: process.env.user_pool_id, 
            ClientId: process.env.client_id, 
            AuthParameters: {
                USERNAME: email, 
                PASSWORD: password
            }
        }; 
        const response = await cognito.adminInitiateAuth(params).promise(); 
        return formatJsonResponse(response); 
    } catch (error) {
        return formatErrorResponse(error); 
    }
}

export const main = middy(loginHandler).use(httpErrorHandler()); 