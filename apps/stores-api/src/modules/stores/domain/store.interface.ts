import { StoreWithOutUser } from '../type';

export interface StoreRepository {
  getStore: (storeId: number) => Promise<StoreWithOutUser>;
}
