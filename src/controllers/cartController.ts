import { Cart } from "src/database/cart";
import { CartItem } from "src/database/cartItem";
import { Product } from "src/database/product";

export const getCart = async(username: string): Promise<Cart> => {
    const cart = await Cart.get(username); 
    return cart; 
}

export const getProducts = async(username: string): Promise<Product[]> => {
    const cart = await getCart(username); 
    const products: Product[] = []; 
    cart.items.forEach(item => {
        products.push(item.product);
    })
    return products; 
}

export const addItem = async(username: string, item: CartItem): Promise<Cart> => {
   const cart=  await Cart.update(username, "products", item); 
   return cart; 
}

export const createCart = async (username: string, item: CartItem): Promise<Cart> => {
    let cart = await getCart(username); 
    if(!cart) {
        cart = new Cart(username, item)
        await Cart.create(cart); 
    }; 

    return cart; 
}

export const deleteCart = async(username: string) => {
    const cart = await Cart.remove(username); 
    return cart; 
}