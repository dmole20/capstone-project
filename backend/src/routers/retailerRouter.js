import express from "express";
import {
  getRetailerDetail,
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
retailerRouter.get("/:id", getRetailerDetail);

export default retailerRouter;
