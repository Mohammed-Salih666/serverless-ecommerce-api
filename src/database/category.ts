import { AttributeValue, QueryCommand } from "@aws-sdk/client-dynamodb";
import { getDocClient } from "./client";
import {DeleteCommand, GetCommand, PutCommand, UpdateCommand } from '@aws-sdk/lib-dynamodb'; 

export class Category { 
    name: string; 
    isActive: boolean; 
    private static pk: string = "CATEGORY"; 
    sk: string; 

    constructor(name: string, isActive: boolean) {
        this.name = name; 
        this.isActive = isActive; 
        this.sk = `${Category.pk}#${name}`
    }

    static fromItem(item?: Record<string, any>): Category {
        if(!item) throw new Error("no item"); 
        return new Category(item.name, item.isActive); 
    }

    static get = async (name: string): Promise<Category> => {
        const client = getDocClient(); 
        const key = {
            pk: Category.pk, 
            sk: `${Category.pk}#${name}`
        }

        const command = new GetCommand({
            TableName: process.env.TABLE_NAME, 
            Key: key,
        }); 

        try {
            const resposne = await client.send(command); 
            const category = Category.fromItem(resposne.Item); 
            return category;
        } catch (error) {
            console.log(error); 
            throw error; 
        }
    }

    static create = async (category: Category): Promise<Category> => {
        const client = getDocClient();
        const command = new PutCommand({
            TableName: process.env.TABLE_NAME,
            Item: category
        }); 

        try {
            await client.send(command); 
            return category; 
        } catch (error) {
            console.log(error); 
            throw error;
        }
    }

    static getAll = async() => {
        const client = getDocClient(); 
        const command = new QueryCommand({
            TableName: process.env.TABLE_NAME, 
            KeyConditionExpression: "pk = :entity", 
            ExpressionAttributeValues: {
                ":entity": {S: "CATEGORY"},
            }
        });

        try {
            const response = await client.send(command) ; 
            return response.Items; 
        } catch (error) {
            console.log(error); 
            throw error; 
        }
    }

    static update = async(name: string, attribute, value) => {
        const client = getDocClient(); 
        const key = {
            pk: Category.pk, 
            sk: `CATEGORY#${name}`
        }

        const command = new UpdateCommand({
            TableName: process.env.TABLE_NAME,
            Key: key, 
            UpdateExpression: `set ${attribute} = :value`, 
            ExpressionAttributeValues: {
                ":value": value
            },
            ReturnValues: "ALL_NEW"
        })

        try {
            const response = await client.send(command); 
            const category = Category.fromItem(response.Attributes); 
            return category;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    static deleteCategory = async(name: string): Promise<Category> => {
        const client = getDocClient(); 
        const key = {
            pk: Category.pk, 
            sk: `CATEGORY${name}`
        }

        const command = new DeleteCommand({
            TableName: process.env.TABLE_NAME, 
            Key: key, 
            ReturnValues: "ALL_OLD"
        }); 

        try {
            const resposne = await client.send(command);
            const category = Category.fromItem(resposne.Attributes); 
            return category
        } catch (error) {
            console.log(error); 
            throw error; 
        }
    }

    static getProducts = async(categoryName:string): Promise<Record<string, AttributeValue>[]> => {
        const client = getDocClient(); 
        const command = new QueryCommand({
            TableName: process.env.TABLE_NAME, 
            IndexName: "GSI2",
            KeyConditionExpression: "category = :category",
            ExpressionAttributeValues: {
                ":category": {S: categoryName}
            }
        });
        
        try {
            const products = await client.send(command); 
            return products.Items; 
        } catch (error) {
            console.log(error); 
            throw error; 
        }
    }
}