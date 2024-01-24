import { getDocClient } from './client';
import { DeleteCommand, GetCommand, PutCommand, UpdateCommand} from '@aws-sdk/lib-dynamodb';
import { QueryCommand } from '@aws-sdk/client-dynamodb';

export class Product  {
    name: string; 
    price: string; 
    category: string; 
    images: string[]; 
    pk: string = process.env.PRODUCT_PK; 
    sk: string; 

    constructor(name: string, price: string, category: string, images?: string[]) {
        this.name = name; 
        this.price = price; 
        this.category = category;
        this.sk = `${this.pk}#${name}`; 
        if(images) this.images = images; 
    }

    static fromItem(item?: Record<string, any>): Product {
        if(!item) throw new Error ("no item"); 
        return new Product(item.name, item.price, item.category);
    }

    static get = async (name: string): Promise<Product> => {
        const client = getDocClient(); 
        const key = {
            pk: process.env.PRODUCT_PK, 
            sk: `PRODUCT#${name}`
        }

        const command = new GetCommand({
            TableName: process.env.TABLE_NAME, 
            Key: key
        });

        try {
            const response = await client.send(command); 
            const product = Product.fromItem(response.Item); 
            return product; 
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
                ":entity": {S: "PRODUCT"},
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

    static create = async (product: Product): Promise<Product> => {
        const client = getDocClient(); 

        const command = new PutCommand({
            TableName: process.env.TABLE_NAME,
            Item: product
        });

        try {
            await client.send(command); 
            return product; 
        } catch (error) {
            console.log(error); 
            throw error;
        }
    }

    static update = async (name: string, attribute: string, value: string) : Promise<Product> => {
        const client = getDocClient(); 
        const key = {
            pk: process.env.PRODUCT_PK, 
            sk: `PRODUCT#${name}`
        }

        const command = new UpdateCommand({
            TableName: process.env.TABLE_NAME, 
            Key: key,
            UpdateExpression: `set ${attribute} = :value`,
            ExpressionAttributeValues: {
                ":value": value
            }, 
            ReturnValues: 'ALL_NEW'
        }); 

        try {
            const response = await client.send(command); 
            const product = Product.fromItem(response.Attributes); 
            return product; 
        } catch (error) {
            console.log(error); 
            throw error; 
        }
    }

    static deleteProduct = async(name: string): Promise<Product> => {
        const client = getDocClient(); 
        const key = {
            pk: process.env.PRODUCT_PK, 
            sk: `PRODUCT#${name}`
        }; 

        const command = new DeleteCommand({
            TableName: process.env.TABLE_NAME,
            Key: key, 
            ReturnValues: "ALL_OLD"
        }); 
        
        try {
            const response = await client.send(command); 
            const product = Product.fromItem(response.Attributes); 
            return product; 
        } catch (error) {
            console.log(error); 
            throw error; 
        }
    }
}