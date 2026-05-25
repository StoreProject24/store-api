export interface Setting {
  id: number;
  primaryColor: string;
  secondaryColor: string;
  show_when_out_of_stock: boolean;
  storeId: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface GetSetting {
  storeId: number;
}

export interface UpdateSetting {
  storeId: number;
  primaryColor?: string;
  secondaryColor?: string;
  show_when_out_of_stock?: boolean;
}

export type SettingPublic = Omit<Setting, 'storeId' | 'createdAt' | 'updatedAt'>;
