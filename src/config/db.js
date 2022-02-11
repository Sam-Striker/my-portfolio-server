import mongoose from "mongoose";
import "dotenv/config";

const { MONGO_URI, NODE_ENV, MONGO_URI_TEST } = process.env;

const connectDB = async () => {
  const conn = await mongoose.connect(
    NODE_ENV === "test" ? MONGO_URI_TEST : MONGO_URI,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  );
  console.log(`MongoDB Connected: ${conn.connection.host}`);
};

export default connectDB;
