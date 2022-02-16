import express from "express";
import "@babel/polyfill";
import routes from "./routes/index";
import connectDB from "./config/db";
import fileupload from "express-fileupload";
import cookieParser from "cookie-parser";
import "dotenv/config";
import cors from "cors"

const corsOptions = {
     origin: '*',
     optionsSuccessStatus: 200 
 }
//const corsOptions = { origin: '*', optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204 
//} 


const app = express();
connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(fileupload({ useTempFiles: true }));
app.use("/", routes);



app.listen(
  process.env.PORT,
  console.log(
    `server running in ${process.env.NODE_ENV} at ${process.env.PORT}`
  )
);

export default app;
