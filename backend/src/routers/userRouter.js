import express from "express";
import {
  getUserProfile,
  logout,
  postJoin,
  postLogin,
} from "../controllers/userController";
import { publicOnlyMiddleware, userOnlyMiddleware } from "../middlewares";

const userRouter = express.Router();

userRouter.get("/profile", getUserProfile);
userRouter.post("/join", postJoin);
userRouter.post("/login", postLogin);
userRouter.get("/logout", logout);

export default userRouter;
