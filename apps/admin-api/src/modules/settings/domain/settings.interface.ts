import { GetSetting, Setting, UpdateSetting } from '@shared/types/setting.types';

export interface SettingRepository {
  getSetting(data: GetSetting): Promise<Setting>;
  updateSetting(data: UpdateSetting): Promise<Setting>;
}
