import { Store } from '@shared/types/store.types';
import { getStoreById } from '../repository/store.repository';
import { StoreRepository } from './store.interface';
import { AppError } from '@shared/helpers/response/response';
import { getSignedImageUrls } from '~services/image/image.service';

export class StoreDomain implements StoreRepository {
  async getStore(storeId: number): Promise<Store> {
    const store = await getStoreById(storeId);
    if (!store) {
      throw new AppError(404, 'Store not found');
    }
    const [logoUrl, bannerUrl] = await getSignedImageUrls([store.logoUrl, store.bannerUrl])

    return {
      ...store,
      logoUrl,
      bannerUrl
    }
  }
}
