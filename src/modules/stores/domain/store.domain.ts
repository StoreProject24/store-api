import _ from "lodash";
import {
	create,
	getById,
	getByUserId,
	update,
} from "../repository/store.repository";
import {
	FieldStore,
	Store,
	StoreCreate,
	StoreUpdate,
} from "../types/store.types";
import { StoreRepository } from "./store.interface";
import { setKeyRedis, getKeyRedis, deleteKeyRedis } from "@config/redis/redis";
import { Request } from "express";
import { deleteImages, uploadImages } from "@services/image/image.service";

export class StoreDomain implements StoreRepository {
	async createStore(data: StoreCreate) {
		const existStore = await getByUserId(data.userId);
		if (existStore.length) {
			throw new Error("Store found");
		}
		return await create(data);
	}

	async updateStore(id: number, data: StoreUpdate) {
		const store = await update(id, data);
		await deleteKeyRedis(`user-${data.userId}`);
		return store;
	}

	async deleteStore(id: number) {
		const store = await getById(id);
		if (!store) {
			throw new Error("Store not found");
		}
		const newStatusId = store.statusId === 2 ? 1 : 2;
		await update(id, { statusId: newStatusId });
		await deleteKeyRedis(`user-${store.userId}`);
	}

	async getStoreById(id: number) {
		const store = await getById(id);
		if (!store) {
			throw new Error("Store not found");
		}
		return _.omit(store, ["userId"]);
	}

	async getStoreByIdUser(userId: number) {
		const existStore = await getKeyRedis(`user-${userId}`);
		if (existStore.length) {
			return JSON.parse(existStore);
		}
		const store = await getByUserId(userId);
		if (store.length) {
			await setKeyRedis(`user-${userId}`, JSON.stringify(store[0]));
		}
		return store;
	}

	async uploadImage(userId: number, field: FieldStore["field"], req: Request) {
		const existStore = await getKeyRedis(`user-${userId}`);
		const store: Store = existStore.length ? JSON.parse(existStore) : null;
		if (store === null) {
			throw new Error("Store not found");
		}
		const image = await uploadImages(req, store.id, "store");
		const storeUpdate = await update(store.id, {
			[field]: image[0],
		});
		await deleteImages([store[field]]);
		await setKeyRedis(`user-${userId}`, JSON.stringify(storeUpdate));
		return storeUpdate;
	}
}
