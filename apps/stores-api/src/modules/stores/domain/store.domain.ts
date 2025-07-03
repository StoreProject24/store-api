import { getStoreById } from '../repository/store.repository';
import { StoreRepository } from './store.interface';
import { AppError } from '@shared/helpers/response/response';
import { StoreWithOutUser } from '../type';

export class StoreDomain implements StoreRepository {
  async getStore(storeId: number): Promise<StoreWithOutUser> {
    const store = await getStoreById(storeId);
    if (!store) {
      throw new AppError(404, 'Store not found');
    }
    return store as unknown as StoreWithOutUser;
  }
}
