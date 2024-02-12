import express from "express";
import { StoreController } from "./controller/store.controller";

export const storeRouter = express.Router();

storeRouter.use(StoreController);
