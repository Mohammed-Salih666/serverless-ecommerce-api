import middy from "@middy/core";
import httpErrorHandler from "@middy/http-error-handler";
import { SNSEvent, SNSHandler } from "aws-lambda";
import { sendUserUpdatedEmail } from "src/notification/userUpdated";

const sendEmailHandler: SNSHandler = async (event: SNSEvent) => {
    
    const records = event.Records; 

    try {
            records.forEach(async record => {
                const address = record.Sns.MessageAttributes.email.Value;
                const updatedAttribute = record.Sns.MessageAttributes.attribute.Value;
                const newValue = record.Sns.MessageAttributes.newValue.Value; 
                await sendUserUpdatedEmail(address, updatedAttribute, newValue) 
            });

        } catch (error) {
            console.error(error); 
    }
}

export const main = middy(sendEmailHandler).use(httpErrorHandler());