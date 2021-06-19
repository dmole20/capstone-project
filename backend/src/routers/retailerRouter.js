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

retailerRouter.post("/re-join", publicOnlyMiddleware, re_postJoin);
retailerRouter.post("/re-login", publicOnlyMiddleware, re_postLogin);
retailerRouter.get("/re-logout", protectorMiddleware, re_logout);
retailerRouter.get("/:id", getRetailerDetail);

export default retailerRouter;
