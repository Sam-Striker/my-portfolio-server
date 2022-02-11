import express from "express";
import "@babel/polyfill";
import routes from "./routes/index";
import connectDB from "./config/db";
import fileupload from "express-fileupload";
import cookieParser from "cookie-parser";
import "dotenv/config";

const app = express();
connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(fileupload({ useTempFiles: true }));
app.use("/", routes);


const port = procces.env.PORT || 4000
app.listen(
  process.env.PORT,
  console.log(
    `server running at ${port}`
  )
);

export default app;
