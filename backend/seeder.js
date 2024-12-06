import mongoose from "mongoose";
import dotenv from 'dotenv'
import users  from './data/users.js'
import address from "./data/address.js";
import addressBook from "./data/addressBook.js";
import colors from 'colors'
import { menu } from './data/menu.js'
import User from './models/userModel.js'
import Menu from './models/menuModel.js'
import Order from './models/orderModel.js'
import Address from "./models/addressModel.js";
import AddressBook from "./models/addressBookModel.js";
import connectDB from './config/db.js'

dotenv.config()

connectDB()

const importData = async () => {
    try {
       await Order.deleteMany(); 
       await Menu.deleteMany(); 
       await User.deleteMany();
       await Address.deleteMany(); 
       await AddressBook.deleteMany(); 

       const createdUsers = await User.insertMany(users);
       const adminUser = createdUsers[0]._id
       
 
       const sampleMenu = menu.map((men) => {
        return { ... men, user: adminUser}
       })

       await Menu.insertMany(sampleMenu)

       
       const createdAddy = address.map((addy) => {
        return { ...addy, user: adminUser}
       });
       
       await Address.insertMany(createdAddy);

       const createdAddyBook = addressBook.map((addy) => {
        return { ...addy, user: adminUser}
       });
       
       await AddressBook.insertMany(createdAddyBook);
       

       console.log('Data Imported'.green.inverse)
       process.exit()
    } catch (error) {
        console.error(`${error}`.red.inverse)
        process.exit(1)
    }
}

const destroyData = async () => {
    try {
        await Order.deleteMany(); 
        await Menu.deleteMany(); 
        await User.deleteMany();
        await Address.deleteMany(); 
        await AddressBook.deleteMany(); 

        console.log('Data Destroyed!'.red.inverse)
        process.exit()
    } catch (error) {
        console.error(`${error}`.red.inverse)
        process.exit(1)
    }
}

if (process.argv[2] === '-d') {
    destroyData()
} else {
    importData()
}
