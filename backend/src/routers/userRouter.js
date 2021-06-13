import express from "express";
import { logout, postJoin, postLogin } from "../controllers/userController";

const userRouter = express.Router();

userRouter.post("/join", postJoin);
userRouter.post("/login", postLogin);
userRouter.get("/logout", logout);

export default userRouter;
