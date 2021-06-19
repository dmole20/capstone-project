import express from "express";
import { logout, postJoin, postLogin } from "../controllers/userController";
import { publicOnlyMiddleware, userOnlyMiddleware } from "../middlewares";

const userRouter = express.Router();

userRouter.post("/join", publicOnlyMiddleware, postJoin);
userRouter.post("/login", publicOnlyMiddleware, postLogin);
userRouter.get("/logout", userOnlyMiddleware, logout);

export default userRouter;
