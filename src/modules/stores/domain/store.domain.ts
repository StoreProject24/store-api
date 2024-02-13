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
		return store;
	}
}
