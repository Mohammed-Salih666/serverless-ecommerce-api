import {SES} from 'aws-sdk';

export const sendUserUpdatedEmail = async (addresses: string[], updatedAttribute: string, newValue: string) => {
   const ses = new SES();

   const message: SES.Message = {
      Subject:  {
         Data: `Your ${updatedAttribute} Has Changed`
      }, 
      Body: {
         Text: {
            Data: `Your new ${updatedAttribute} is: ${newValue}`
         }
      }
   }

   const params = {
      Destination: {
         ToAddresses: addresses,
      },
      Source: "",
      Message: message
   }
   const response = await ses.sendEmail(params).promise();
   return response; 
}