import express from "express";
import { StoreController } from "./controller/store.controller";

export const storesRouter = express.Router();

storesRouter.use(StoreController);
