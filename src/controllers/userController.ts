import {User} from 'src/database/user'; 
import { publishToTopic } from 'src/notification/subscription';

export const getAllUsers = async(): Promise<User[]> => {
    const usersRecord = await User.getAll(); 
    const users: User[] = [];
    usersRecord.forEach(record => {
        const user = User.fromItem(record); 
        users.push(user); 
    })

    return users; 
}

export const getUser = async (username: string): Promise<User> => { 
    const user = await User.get(username); 
    return user; 
}

export const createUser = async(user: User): Promise<User> => {
    const createdUser = await User.create(user); 
    return createdUser; 
}

export const updateUser = async(username: string, attribute: string, value: string) => {
    if(attribute == "username" || attribute == "pk" || attribute == "sk") throw new Error(`Cannot update ${attribute}. It is part of the primary key.`)
    const user = await User.update(username, attribute, value); 
    publishToTopic(process.env.USER_UPDATED_TOPIC, "User has been updated"); 
    return user; 
}

export const deleteUser = async(username: string): Promise<User> => {
    const user = await User.remove(username); 
    return user; 
}