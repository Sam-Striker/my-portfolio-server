import mongoose from "mongoose";
import "dotenv/config";

const { MONGO_URI } = process.env;

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(error);
  }
};

export default connectDB;
