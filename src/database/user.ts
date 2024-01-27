import { getDocClient } from './client';
import { DeleteCommand, GetCommand, PutCommand, UpdateCommand} from '@aws-sdk/lib-dynamodb';
import Address from './address';
import { QueryCommand } from '@aws-sdk/client-dynamodb';

export class User  {
    username: string; 
    name: string; 
    email: string; 
    password: string; 
    address: Address[] = []; 
    pk = process.env.USER_PK;
    sk: string; 
    key: Object; 
    constructor(username: string, name: string, email: string, password: string, address: Address) {
        this.username = username; 
        this.name = name; 
        this.password = password; 
        this.email = email; 
        this.address.push(address); 
        this.sk = `${this.pk}#${username}`; 
        this.key = {
            pk: this.pk,
            sk: this.sk
        }
    }

    static fromItem(item?: Record<string, any>): User {
        if(!item) throw new Error("no item");
        return new User(item.username, item.name, item.email, item.password, item.address);  
    }

    static create = async (user: User): Promise<User> => {
        const client = getDocClient(); 
        
        console.log(user);
        const command = new PutCommand({
            TableName: process.env.TABLE_NAME, 
            Item: user
        }); 
    
        try {
            await client.send(command); 
            return user; 
        } catch (error) {
            console.log(error); 
            throw error; 
        }
    }
    
    static get = async (username: string): Promise<User> => {
        const client = getDocClient(); 
        const key = {
            pk: process.env.USER_PK, 
            sk: `USER#${username}`
        }; 
    
        const command = new GetCommand({
            TableName: process.env.TABLE_NAME, 
            Key: key
        })
        try {
            
            const response = await client.send(command); 
            const user = User.fromItem(response.Item);
            return user; 
        } catch (error) {
            console.log(error); 
            throw error; 
        }
    }
    
    static getAll = async () => {
        const client = getDocClient(); 

        const command = new QueryCommand({
            TableName: process.env.TABLE_NAME, 
            KeyConditionExpression: "pk = :entity", 
            ExpressionAttributeValues: {
                ":entity": {S: "USER"},
            }
        });
    
        try {
            const response = await client.send(command);
            return response.Items;
        } catch (error) {
            console.log(error); 
            throw error; 
        }
    }
    
    //can only update one attribute at a time; username cannot be updated;  
    static update = async(username: string, attribute: string, value: string) => {
        const client = getDocClient(); 
        const key = {
            pk: "USER", 
            sk: `USER#${username}`
        }; 
    
        const command = new UpdateCommand({
            TableName: process.env.TABLE_NAME,
            Key: key, 
            UpdateExpression: `set ${attribute} = :value`, 
            ExpressionAttributeValues: {
                ":value": value
            },
            ReturnValues: "ALL_NEW",
        });
    
        try {
            const response = await client.send(command);
            return response.Attributes;
    
        } catch (error) {
            console.log(error); 
            throw error ;
        }
    }
    
    
    
    static remove = async(username: string): Promise<User> => {
        const client = getDocClient();
        const key = {
            pk: "USER", 
            sk: `USER#${username}`
        }; 
    
        const command = new DeleteCommand({
            TableName: process.env.TABLE_NAME, 
            Key: key,
            ReturnValues: "ALL_OLD",
        }); 
    
        try {
            const response = await client.send(command); 
            const user = User.fromItem(response.Attributes); 
            return user; 
        } catch (error) {
            console.log(error); 
            throw error; 
        }
    }

}
