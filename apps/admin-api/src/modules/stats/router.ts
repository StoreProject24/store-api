import express from 'express';
import { StatsController } from './controller/stats.controller';

export const statsRouter = express.Router();

statsRouter.use(StatsController);
