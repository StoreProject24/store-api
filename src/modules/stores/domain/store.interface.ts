import { Request } from "express";
import { Store, StoreCreate, StoreUpdate } from "../types/store.types";

export interface StoreRepository {
	createStore: (store: StoreCreate) => Promise<Store>;
	updateStore: (id: number, store: StoreUpdate) => Promise<Store>;
	deleteStore: (id: number) => Promise<void>;
	updateImageStore: (req: Request) => Promise<string>;
}
