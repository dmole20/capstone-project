import express from "express";
import {
  applyEvent,
  deleteShoes,
  drawWinner,
  getShoes,
  getShoesDetail,
  uploadShoes,
} from "../controllers/shoesController";
import { retailerOnlyMiddleware, userOnlyMiddleware } from "../middlewares";
const shoesRouter = express.Router();

shoesRouter.get("/", getShoes);
shoesRouter.post("/", retailerOnlyMiddleware, uploadShoes);
shoesRouter.get("/:id", getShoesDetail);
shoesRouter.delete("/:id", retailerOnlyMiddleware, deleteShoes);
shoesRouter.post("/:id/applying", userOnlyMiddleware, applyEvent);
shoesRouter.post("/:id/draw", retailerOnlyMiddleware, drawWinner);
export default shoesRouter;
