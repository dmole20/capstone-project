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

shoesRouter.get("/", getShoes); // 모든 shoes
shoesRouter.post("/", retailerOnlyMiddleware, uploadShoes); // retailer가 shoes 등록
shoesRouter.get("/:id", getShoesDetail); // 해당 id를 가진 shoes api
shoesRouter.delete("/:id", retailerOnlyMiddleware, deleteShoes); // retailer가해당 id를 가진 shoes 삭제 (미완성)
shoesRouter.post("/:id/applying", userOnlyMiddleware, applyEvent); // user가 해당 id를 가진 shoes에 응모 참여
shoesRouter.post("/:id/draw", retailerOnlyMiddleware, drawWinner); // retailer가 해당 id를 가진 shoes의 추첨시작
export default shoesRouter;
