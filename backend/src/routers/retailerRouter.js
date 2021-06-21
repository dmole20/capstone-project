import express from "express";
import {
  getRetailerDetail,
  getRetailerProfile,
  re_logout,
  re_postJoin,
  re_postLogin,
} from "../controllers/retailerController";
import {
  protectorMiddleware,
  publicOnlyMiddleware,
  retailerOnlyMiddleware,
} from "../middlewares";

const retailerRouter = express.Router();

retailerRouter.post("/re_join", re_postJoin);
retailerRouter.post("/re_login", re_postLogin);
retailerRouter.get("/re_logout", re_logout);
retailerRouter.get("/profile", getRetailerProfile);
retailerRouter.get("/:id", getRetailerDetail); // 해당 id를 가진 retailer

export default retailerRouter;
