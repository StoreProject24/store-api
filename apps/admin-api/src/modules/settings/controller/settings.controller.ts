import { Request, Response, Router } from 'express';
import { handleError, handleSuccess } from '@shared/helpers/response/response';
import { verifyTokenAdminStore } from '~middlewares/verifyAdminStore.middleware';
import { HttpCode } from '@shared/helpers/response/response.type';
import { SettingsDomain } from '../domain/settings.domain';
import { validatorUpdateSetting } from '../validator/settings.validator';

export const SettingsController = Router();

SettingsController.get('/', verifyTokenAdminStore, async (req: Request, res: Response) => {
  try {
    const settingsDomain = new SettingsDomain();
    const setting = await settingsDomain.getSetting({
      storeId: req.user.storeId,
    });
    handleSuccess(res, HttpCode.OK, { setting });
  } catch (error: any) {
    handleError(res, error.status, error.message);
  }
});

SettingsController.patch(
  '/',
  [verifyTokenAdminStore, ...validatorUpdateSetting],
  async (req: Request, res: Response) => {
    try {
      const settingsDomain = new SettingsDomain();
      const setting = await settingsDomain.updateSetting({
        storeId: req.user.storeId,
        primaryColor: req.body.primaryColor,
        secondaryColor: req.body.secondaryColor,
        show_when_out_of_stock: req.body.show_when_out_of_stock,
      });
      handleSuccess(res, HttpCode.OK, { setting });
    } catch (error: any) {
      handleError(res, error.status, error.message);
    }
  }
);
