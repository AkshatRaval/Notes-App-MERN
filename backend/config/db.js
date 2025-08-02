import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("Mongo DB connected successfully");
        
    } catch (error) {
        console.error("Server can not be connect")
        process.exit(1)
    }
}

export default connectDB