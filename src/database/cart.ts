import { getDocClient } from "./client";
import {DeleteCommand, GetCommand, PutCommand, UpdateCommand} from '@aws-sdk/lib-dynamodb'; 
import { CartItem } from "./cartItem";

export class Cart {
    private static tableName = process.env.TABLE_NAME; 
    user: string; 
    code: string; 
    items: CartItem[] = []; 
    static pk: string = "USER"; 
    sk: string;

    constructor(username: string, item: CartItem) {
        this.user = username; 
        this.sk = `USER#${username}#CART`; 
        this.items.push(item); 
        this.code = `cart-${new Date().getTime().toLocaleString()}`
    }

    static fromItem(item?: Record<string, any>): Cart {
        if(!item) throw new Error ("no item"); 
        return new Cart(item.username, item.products)
    }

    static get = async (username: string): Promise<Cart> => {
        const client = getDocClient(); 

        const key = {
            pk: Cart.pk, 
            sk: `USER#${username}#CART`
        }

        const command = new GetCommand({
            TableName: Cart.tableName,
            Key: key, 
        }); 

        try {
            const response = await client.send(command); 
            const cart = Cart.fromItem(response.Item); 
            return cart; 
        } catch (error) {
            throw error; 
        }
    }

   static create = async(cart: Cart): Promise<Cart> => {
    const client = getDocClient(); 

    const command = new PutCommand({
        TableName: Cart.tableName,
        Item: cart, 
    }); 

    try {
        await client.send(command); 
        return cart; 
    } catch (error) {
        throw error;
    }
   }

   static update = async (username: string, attribute: string, value: boolean | CartItem): Promise<Cart> => {

    const client = getDocClient(); 
    const key = {
        pk: Cart.pk,
        sk: `USER#${username}#CART`
    }; 

    const updateExpression = 
    typeof value === "boolean" ? 
    `set ${attribute} = :value` : 
    `set ${attribute} = list_append(${attribute}, :value)`; 

    const expressionAttributeValues = {
        ":value": typeof value === "boolean" ? value : [value]
    }
    
    const command = new UpdateCommand({
        TableName: Cart.tableName, 
        Key: key, 
        UpdateExpression: updateExpression, 
        ExpressionAttributeValues: expressionAttributeValues, 
        ReturnValues: "ALL_NEW"
    });

    try {
        const response = await client.send(command); 
        const cart = Cart.fromItem(response.Attributes); 
        return cart; 
    } catch (error) {
        throw error; 
    }
   }

   static remove = async(username: string): Promise<Cart> => {
    const client = getDocClient(); 
    const key = {
        pk: Cart.pk, 
        sk: `USER${username}#CART`
    }

    const command = new DeleteCommand({
        TableName: Cart.tableName, 
        Key: key, 
        ReturnValues: "ALL_OLD",
    }); 

    try {
        const response = await client.send(command); 
        const cart = Cart.fromItem(response.Attributes); 
        return cart; 
    } catch (error) {
        throw error; 
    }
   }

}
