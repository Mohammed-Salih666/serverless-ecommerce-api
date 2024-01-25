import {Category} from 'src/database/category'; 
import { Product } from 'src/database/product';
import {unmarshall} from '@aws-sdk/util-dynamodb'

export const getAllCategories = async(): Promise<Category[]> => {
    const categoriesRecord = await Category.getAll(); 
    const categories: Category[] = []; 

    categoriesRecord.forEach(record => {
        const category = Category.fromItem(record); 
        categories.push(category); 
    });

    return categories; 
}

export const getCategory = async (name: string): Promise<Category> => {
    const category = await Category.get(name); 
    return category;
}

export const createCategory = async (category: Category): Promise<Category> => {
    const createdCategory = await Category.create(category); 
    return createdCategory
}

export const updateCategory = async (name: string, attribute: string, value: string) => {
    if(attribute == "pk"  || attribute == "sk" || attribute == "name") throw new Error(`Cannot change ${attribute}. It is part of the primary key`); 
    
    const category = await Category.update(name, attribute, value); 
    return category; 
}

export const deleteCategory = async(name: string): Promise<Category> => {
    const category = await Category.deleteCategory(name); 
    return category; 
}

export const getProducts = async (categoryName: string) => {
    const productsRecord = await Category.getProducts(categoryName);
    const products = [];
    productsRecord.forEach(record => {
        const product = unmarshall(record); 
        products.push(product);
    }) 

    return products;
}
