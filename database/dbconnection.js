import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const database = await  mongoose.connect(process.env.MONGO_URI)
        console.log("mongodb connected:", database.connection.host);
    } catch (error) {
        console.log(error); 
    }
}
export default connectDB 