import { AttributeValue } from "aws-lambda";
import {unmarshall} from '@aws-sdk/util-dynamodb'

export const toModelInstance = (records: Record<string, AttributeValue>[]
    , model: any) => {
    
        const models: typeof model[] = []; 
        
        records.forEach(record => {
            const modelInstance = model.fromItem(record);
            model.push(modelInstance); 
        }); 
        return models; 
}

export const unmarshallRecords = (records: Record<string, AttributeValue>[] | AttributeValue[]) => {
    const unmarshalledRecords = []; 
    records.forEach((record) => {
        const unmarshalledRecord = unmarshall(record); 
        unmarshalledRecords.push(unmarshalledRecord);
    })

    return unmarshalledRecords;
}