import _ from 'lodash';
import { Request } from 'express';
// import { setKeyRedis, deleteKeyRedis } from '~config/redis/redis';
import { deleteImages, uploadImages } from '~services/image/image.service';
import { AppError } from '@shared/helpers/response/response';
import { create, getById, getByUserId, update } from '../repository/store.repository';
import { FieldStore, StoreCreate, StoreUpdate } from '@shared/types/store.types';
import { StoreRepository } from './store.interface';
import { existStoreRedis, getStoresRedis } from '../utils/storeRedis';
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
      throw new AppError(404, 'Store not found');
    }
    const newStatusId = store.statusId === 2 ? 1 : 2;
    await update(id, { statusId: newStatusId });
    // await deleteKeyRedis(`user-${store.userId}`);
  }

  async getStoreById(id: number) {
    const store = await getById(id);
    if (!store) {
      throw new AppError(404, 'Store not found');
    }
    return _.omit(store, ['userId']);
  }

  async getStoreByIdUser(userId: number) {
    const existStores = await getStoresRedis(userId);
    if (existStores.length) {
      return existStores;
    }
    const stores = await getByUserId(userId);
    // await setKeyRedis(`user-${userId}`, JSON.stringify(stores));
    return stores;
  }

  async uploadImage(userId: number, storeId: number, field: FieldStore['field'], req: Request) {
    const store = await existStoreRedis(userId, storeId);
    if (!store) {
      throw new AppError(404, 'Store not found');
    }
    const image = await uploadImages(req, store.id, 'store');
    const storeUpdate = await update(store.id, {
      [field]: image[0],
    });
    await deleteImages([store[field]]);
    // await deleteKeyRedis(`user-${userId}`);
    return storeUpdate;
  }
}
