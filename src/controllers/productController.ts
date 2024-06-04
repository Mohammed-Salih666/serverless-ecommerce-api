import {Product} from 'src/database/product'; 
import { unmarshallRecords } from 'src/tools/recordFormatter';

export const getAllProducts = async(): Promise<Product[]> => {
    const prdouctsRecord = await Product.getAll(); 
    const products: Product[] = []; 

    prdouctsRecord.forEach(record => {
        const product = Product.fromItem(record); 
        products.push(product);
    }); 

    const ps = unmarshallRecords(prdouctsRecord);
    return ps; 
}

export const getProduct = async (name: string): Promise<Product> => {
    const product = await Product.get(name); 
    return product; 
}

export const createProduct = async (product: Product): Promise<Product> => {
    const createdProduct = await Product.create(product); 
    return createdProduct; 
}

export const updateProduct = async(name: string, attribute: string, value: string): Promise<Product> => {
    if(attribute == "pk" || attribute == "sk" || attribute == "name") throw new Error(`Cannot update ${attribute}. It is part of the primary key`); 
    
    const product = await Product.update(name, attribute, value); 
    return product; 
}

export const deleteProduct = async (name: string): Promise<Product> => {
    const product = await Product.remove(name); 
    return product;
}