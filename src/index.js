import express from "express";
import routes from "./routes/index";
import connectDB from "./config/db";

const app = express();
connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/", routes);

app.listen(4000, () => {
  console.log("Server running at port 4000");
});
