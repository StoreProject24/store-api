import _ from 'lodash';
import { Request } from 'express';
// import { setKeyRedis, deleteKeyRedis } from '~config/redis/redis';
import { deleteImages, getSignedImageUrls, uploadImages } from '~services/image/image.service';
import { AppError } from '@shared/helpers/response/response';
import { create, getById, getByUserId, update } from '../repository/store.repository';
import { FieldStore, Store, StoreCreate, StoreUpdate } from '@shared/types/store.types';
import { StoreRepository } from './store.interface';
import { existStoreRedis, getStoresRedis } from '../utils/storeRedis';
import { HttpCode } from '@shared/helpers/response/response.type';
export class StoreDomain implements StoreRepository {
  async createStore(data: StoreCreate) {
    return await create(data);
  }

  async updateStore(id: number, data: StoreUpdate) {
    const store = await update(id, data);
    // await deleteKeyRedis(`user-${data.userId}`);
    return store;
  }

  async deleteStore(id: number) {
    const store = await getById(id);
    if (!store) {
      throw new AppError(HttpCode.NOT_FOUND, 'Tienda no encontrada');
    }
    const newStatusId = store.statusId === 2 ? 1 : 2;
    await update(id, { statusId: newStatusId });
    // await deleteKeyRedis(`user-${store.userId}`);
  }

  async getStoreById(id: number) {
    const store = await getById(id);
    if (!store) {
      throw new AppError(HttpCode.NOT_FOUND, 'Tienda no encontrada');
    }
    return _.omit(store, ['userId']);
  }

  async getStoreByIdUser(userId: number) {
    // const existStores = await getStoresRedis(userId);
    // console.log("existStores ", existStores)
    // if (existStores.length) {
    //   return existStores;
    // }

    const stores = await getByUserId(userId);
    const storesImagesSigned: Store [] = []
    for (const store of stores) {
      const signedImageUrls = await getSignedImageUrls([store.bannerUrl, store.logoUrl])
      store.bannerUrl = signedImageUrls[0]
      store.logoUrl = signedImageUrls[1]
      storesImagesSigned.push(store)
    }
    // await setKeyRedis(`user-${userId}`, JSON.stringify(stores));
    return storesImagesSigned;
  }

  async uploadImage(userId: number, storeId: number, field: FieldStore['field'], req: Request) {
    // const store = await existStoreRedis(userId, storeId);
    const store = await getById(storeId)
    if (!store) {
      throw new AppError(HttpCode.NOT_FOUND, 'Tienda no encontrada');
    }
    const image = await uploadImages(req, store.id, 'store', false);
    const storeUpdate = await update(store.id, {
      [field]: image[0],
    });
    await deleteImages([store[field]]);
    const signedImageUrl = await getSignedImageUrls(image)

    // await deleteKeyRedis(`user-${userId}`);
    return {
      ...storeUpdate,
      [field]: signedImageUrl[0]
    };
  }
}
