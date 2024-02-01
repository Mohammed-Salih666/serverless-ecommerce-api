import { Cart } from "src/database/cart";
import { Product } from "src/database/product";

export const getCart = async(username: string): Promise<Cart> => {
    const cart = await Cart.get(username); 
    return cart; 
}

export const getProducts = async(username: string): Promise<Product[]> => {
    const cart = await getCart(username); 
    return cart.products; 
}

export const addProduct = async(username: string, product: Product): Promise<Cart> => {
   const cart=  await Cart.update(username, "products", product); 
   return cart; 
}

export const createCart = async (username: string, product: Product): Promise<Cart> => {
    let cart = await getCart(username); 
    if(!cart) {
        cart = new Cart(username, product)
        await Cart.create(cart); 
    }; 

    return cart; 
}

export const deleteCart = async(username: string) => {
    const cart = await Cart.remove(username); 
    return cart; 
}