import { getKeyRedis } from "@config/redis/redis"
import { Store } from "../types/store.types"

const existStoreRedis = async (userId: number, storeId: number) => {
	const existStore = await getKeyRedis(`user-${userId}`);
	if (!existStore) {
		return null
	}
	const stores: Store[] = JSON.parse(existStore);
	return stores.find((item) => item.id === storeId);
}

const getStoresRedis = async (userId: number) => {
    const existStore = await getKeyRedis(`user-${userId}`);
    const stores: Store[] = existStore ? JSON.parse(existStore) : [];
    return stores;
}

export { existStoreRedis, getStoresRedis };