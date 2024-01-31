import { SNSMessage } from "aws-lambda";
import { SNS } from "aws-sdk";

const sns = new SNS();

export const subscribeToTopic = async (topicArn: string, endpoint: string) => { 
    const params = {
        Protocol: "lambda", 
        TopicArn: topicArn, 
        Endpoint: endpoint
    }
    const response = await sns.subscribe(params).promise();
    return response;
}

export const createTopic = async (topicName: string) => {
    const response = await sns.createTopic({Name: topicName}).promise();

    return response;
}

export const publishToTopic = async (topicArn: string, event: SNSMessage) => {

   const response = await sns.publish({
        TopicArn: topicArn, 
        Message: JSON.stringify(event)
    }).promise(); 

    return response; 
}