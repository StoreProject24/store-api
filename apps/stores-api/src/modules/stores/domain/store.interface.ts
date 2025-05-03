import { Store } from '@shared/types/store.types';

export interface StoreRepository {
  getStore: (storeId: number) => Promise<Store>;
}
