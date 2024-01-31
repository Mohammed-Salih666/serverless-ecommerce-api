import middy from '@middy/core';
import httpErrorHandler from '@middy/http-error-handler';
import { APIGatewayProxyEvent, APIGatewayProxyHandler } from 'aws-lambda';
import * as AWS from 'aws-sdk';
import { formatJsonResponse } from 'src/tools/responseFormatter';

const signUpHandler: APIGatewayProxyHandler = async(event: APIGatewayProxyEvent) => {
    const cognito = new AWS.CognitoIdentityServiceProvider() ;

    const body = JSON.parse(event.body); 
    const {name, email, password} = body;
    const params = {
        UserPoolId: process.env.user_pool_id,
        Username: email, 
        UserAttributes: [
            {
                Name: 'name', 
                Value: name
            },
            {
                Name: 'email',
                Value: email, 
            },
    ], 
    }

    const response = await cognito.adminCreateUser(params).promise();
    console.log("USER:: ", response.User);
    if(response.User) {
        const setPasswordParams = {
            Password: password, 
            UserPoolId: process.env.user_pool_id, 
            Username: email, 
            Permanent: true
        }; 
        await cognito.adminSetUserPassword(setPasswordParams).promise(); 
        await cognito.adminAddUserToGroup({
            GroupName: 'User', 
            UserPoolId: process.env.user_pool_id, 
            Username: response.User.Username
        }).promise();
    }

    return formatJsonResponse(response.User); 
}

export const main = middy(signUpHandler).use(httpErrorHandler()); 