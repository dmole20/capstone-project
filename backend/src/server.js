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

// fake data
// import Retailer from "./models/Retailer";
// import Shoes from "./models/Shoes";
// import bcrypt from "bcrypt";

// let ini = 0;
// const fakeInit = async () => {
//   const retailer = await Retailer.create({
//     username: "aa",
//     password: "sd231fsd",
//     phone: "010-1234-1234",
//     shop: "aa",
//     address: "aa",
//   });
//   const newShoes = await Shoes.create({
//     shoesName: "YEEZY",
//     imageUrl:
//       "https://kream-phinf.pstatic.net/MjAyMTA2MTRfMjI1/M…PNG/p_cc7b5b8c518c433fa75323cc68b60838.png?type=m",
//     price: 28,
//     retailer: retailer._id,
//   });
//   ini = 1;
// };
// if (ini === 0) {
//   fakeInit();
// }
//

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

app.get("/", (req, res) => res.send("aa"));
app.use("/api/users", userRouter);
app.use("/api/retailers", retailerRouter);
app.use("/api/shoes", shoesRouter);
const handleListening = () =>
  console.log(`✅ Server listenting on http://localhost:${PORT}`);

app.listen(PORT, handleListening);
