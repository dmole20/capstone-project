import express from "express";
import { getShoes, uploadShoes } from "../controllers/shoesController";
import { retailerOnlyMiddleware } from "../middlewares";
const shoesRouter = express.Router();

shoesRouter.get("/", getShoes);
shoesRouter.post("/", retailerOnlyMiddleware, uploadShoes);

export default shoesRouter;
