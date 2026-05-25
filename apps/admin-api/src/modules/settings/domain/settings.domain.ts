import { GetSetting, UpdateSetting } from '@shared/types/setting.types';
import { create, findByStore, update } from '../repository/settings.repository';
import { SettingRepository } from './settings.interface';

export class SettingsDomain implements SettingRepository {
  async getSetting(data: GetSetting) {
    let setting = await findByStore(data);
    if (!setting) {
      setting = await create(data.storeId);
    }
    return setting;
  }

  async updateSetting(data: UpdateSetting) {
    let setting = await findByStore({ storeId: data.storeId });
    if (!setting) {
      setting = await create(data.storeId);
    }
    return await update(setting.id, data);
  }
}
