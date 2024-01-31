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

export const publishToTopic = async (topicArn: string, message: string) => {

   const response = await sns.publish({
        TopicArn: topicArn, 
        Message:  message
    }).promise(); 

    return response; 
}