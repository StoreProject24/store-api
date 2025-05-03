import { Store, StoreCreate, StoreUpdate } from '@shared/types/store.types';

export interface StoreRepository {
  createStore: (store: StoreCreate) => Promise<Store>;
  updateStore: (id: number, store: StoreUpdate) => Promise<Store>;
  deleteStore: (id: number) => Promise<void>;
}
