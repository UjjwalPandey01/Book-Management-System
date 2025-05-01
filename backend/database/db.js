import mongoose from "mongoose";


const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}`);
    console.log(`Connected to database successfully  ${connectionInstance.connection.host}`);
  } catch (error) {
    console.error("Error connecting to database", error);
    process.exit(1); // Exit the process with failure 
  }
}


export default connectDB;