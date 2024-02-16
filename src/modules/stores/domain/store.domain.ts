import { Request } from "express";
import _ from "lodash";
import { deleteImages, uploadImages } from "@services/image/image.service";
import { create, getById, update } from "../repository/store.repository";
import { StoreCreate, StoreUpdate } from "../types/store.types";
import { StoreRepository } from "./store.interface";

export class StoreDomain implements StoreRepository {
	async createStore(data: StoreCreate) {
		const store = await create(data);
		return store;
	}

	async updateStore(id: number, data: StoreUpdate) {
		const store = await update(id, data);
		return store;
	}

	async deleteStore(id: number) {
		const store = await getById(id);
		if (!store) {
			throw new Error("Store not found");
		}
		const newStatusId = store.statusId === 2 ? 1 : 2;
		await update(id, { statusId: newStatusId });
	}

	async getStoreById(id: number) {
		const store = await getById(id);
		if (!store) {
			throw new Error("Store not found");
		}
		return _.omit(store, ["userId"]);
	}

	async updateImageStore(req: Request) {
		const storeId = req.user.storeId;
		const store = await getById(storeId);
		if (!store) {
			throw new Error("Store not found");
		}
		const field = req.query.field as "logoUrl" | "bannerUrl";
		const response = await uploadImages(req, storeId, "store");
		if (store[field] !== response[0]) {
			await deleteImages(response).catch((error) => {
				throw new Error(error);
			});
		}
		await update(storeId, { [field]: response[0] });
		return response[0];
	}
}
