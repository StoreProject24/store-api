import { create, update } from "../repository/store.repository";
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
		await update(id, { statusId: 2 });
	}
}
