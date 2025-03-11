import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URL}`, {
      dbName: DB_NAME,
    });
    console.log(`connection instance: ${connectionInstance.connection.name}`);
    console.log(`mongodb connected!! DB HOST: ${connectionInstance.connection.host}`);
  } catch (error) {
    console.log(`an error occured connecting database: ${error}`);
    process.exit(1); 
  }
};

export default connectDB;