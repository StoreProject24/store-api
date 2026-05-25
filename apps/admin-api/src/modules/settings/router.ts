import express from 'express';
import { SettingsController } from './controller/settings.controller';

export const settingsRouter = express.Router();

settingsRouter.use(SettingsController);
