import "dotenv/config";
import "./db";
import "./models/User";
import "./models/Shoes";
import "./models/Retailer";
import express from "express";
import session from "express-session";
import MongoStore from "connect-mongo";
import morgan from "morgan";
import userRouter from "./routers/userRouter";
import retailerRouter from "./routers/retailerRouter";
import shoesRouter from "./routers/shoesRouter";

const app = express();
const PORT = process.env.PORT || 4000;
const logger = morgan("dev");

app.use(logger);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGODB_URL }),
  })
);

app.use("/api/users", userRouter);
app.use("/api/retailers", retailerRouter);
app.use("/api/shoes", shoesRouter);
const handleListening = () =>
  console.log(`✅ Server listenting on http://localhost:${PORT}`);

app.listen(PORT, handleListening);
