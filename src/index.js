import express from "express";
import "@babel/polyfill";
import routes from "./routes/index";
import connectDB from "./config/db";
import fileupload from "express-fileupload";
import cookieParser from "cookie-parser";

const app = express();
connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(fileupload({ useTempFiles: true }));
app.use("/", routes);

app.listen(5001, () => {
  console.log("Server running at port 5001");
});

export default app;