import { Cart } from "./cart";
import { CartItem } from "./cartItem";
import { getDocClient } from "./client";
import {GetCommand, DeleteCommand, PutCommand, UpdateCommand} from '@aws-sdk/lib-dynamodb'; 


export class Order { 
    private static tableName = process.env.TABLE_NAME;
    isPaid: boolean;
    user: string; 
    cart: Cart;
    code: string; 
    items: CartItem[] = []
    private static pk: string = "USER"; 
    sk: string; 

    //USER#ORDER#cartCode
    constructor(username: string, cart: Cart){
        this.user = username; 
        this.cart = cart; 
        this.code = cart.code; 
        this.items = cart.items; 
        this.sk = `USER#${username}#ORDER#${this.code}`; 
    }

    static get = async(username: string, code: string): Promise<Record<string, any>> => {
        const client = getDocClient(); 

        const key = {
            pk: Order.pk, 
            sk: `USER#${username}ORDER#${code}`
        }; 

        const command = new GetCommand({
            TableName: this.tableName, 
            Key: key,
        }); 

        try {
            const response = await client.send(command); 
            return response.Item; 
        } catch (error) {
            throw error; 
        }
    }

    static create = async(order: Order): Promise<Order> => {
        const client = getDocClient(); 

        const command = new PutCommand({
            TableName: Order.tableName, 
            Item: order
        }); 

        try {
            await client.send(command); 
            return order;
        } catch (error) {
            throw error; 
        }
    }

    static update = async(username: string, orderCode: string, isPaid: boolean) => {
        const client = getDocClient(); 
        const key = {
            pk: Order.pk, 
            sk: `USER#${username}#ORDER#${orderCode}`
        }; 

        const command = new UpdateCommand({
            TableName: Order.tableName, 
            Key: key, 
            UpdateExpression: `set is_paid = :status`, 
            ExpressionAttributeValues: {
                ":status": isPaid
            }, 
            ReturnValues: "ALL_NEW"
        }); 

        try {
            const response = await client.send(command); 
            return response.Attributes;
        } catch (error) {
            throw error; 
        }
    }

    static remove = async(username: string, orderCode: string) => {
        const client = getDocClient(); 
        const key = {
            pk: Order.pk, 
            sk: `USER#${username}#ORDER#${orderCode}`
        }

        const command = new DeleteCommand({
            TableName: Order.tableName, 
            Key: key, 
            ReturnValues: "ALL_OLD"
        }); 

        try {
            const response = await client.send(command); 
            return response; 
        } catch (error) {
            throw error
        }
    }
}