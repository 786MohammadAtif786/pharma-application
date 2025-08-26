import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); 
const MONGO = process.env.MONGO_URI as string   
const connectDB = async (): Promise<void> => {
    try {
        await mongoose.connect(MONGO);
        console.log("MongoDB is connected");
    } catch (err) {
        console.log("MongoDB connection failed", err);
        process.exit(1);
    }
};

export default connectDB;