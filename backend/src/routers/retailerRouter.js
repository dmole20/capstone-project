import express from "express";
import {
  re_logout,
  re_postJoin,
  re_postLogin,
} from "../controllers/retailerController";

const retailerRouter = express.Router();

retailerRouter.post("/re-join", re_postJoin);
retailerRouter.post("/re-login", re_postLogin);
retailerRouter.get("/re-logout", re_logout);

export default retailerRouter;
