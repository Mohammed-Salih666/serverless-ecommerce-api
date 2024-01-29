import * as Joi from "joi";
export const validator = (schema: Joi.ObjectSchema<any>) => {

    const before = (request: any) => {
        const body = request.event.body; 
        console.log("BODYDYDYDYD: ", typeof request);
        if(!body) throw new Error("Empty Request Body"); 

        const data = JSON.parse(body); 

        const {error} = schema.validate(data, {abortEarly: false}); 

        if(error) throw error;
    }

    return {before};

}