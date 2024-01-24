import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

let docClient = null; 

export const getDocClient = (): DynamoDBDocumentClient => {
    if(docClient) return docClient; 

    const c = new DynamoDBClient({});
    docClient = DynamoDBDocumentClient.from(c);
    return docClient;
}