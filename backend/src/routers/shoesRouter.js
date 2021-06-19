import express from "express";
import {
  applyEvent,
  getShoes,
  getShoesDetail,
  uploadShoes,
} from "../controllers/shoesController";
import { retailerOnlyMiddleware, userOnlyMiddleware } from "../middlewares";
const shoesRouter = express.Router();

shoesRouter.get("/", getShoes);
shoesRouter.post("/", retailerOnlyMiddleware, uploadShoes);
shoesRouter.get("/:id", getShoesDetail);
shoesRouter.post("/:id/applying", userOnlyMiddleware, applyEvent);

export default shoesRouter;
