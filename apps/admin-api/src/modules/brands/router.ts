import express from "express";
import { BrandsController } from "./controller/brands.controller";

export const brandsRouter = express.Router();

brandsRouter.use(BrandsController);
