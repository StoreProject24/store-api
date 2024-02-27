import logger from "@config/logger/logger";
import { createClient } from "redis";

let client: any;

const createClientRedis = async () => {
	client = await createClient()
		.on('connect', () => logger.info("Redis Client connect"))
		.on("error", (err) => logger.error("Redis Client Error", err))
		.connect();
};
export const setKeyRedis = async (key: string, value: string) => {
	await client.set(key, value);
};

export const getKeyRedis = async (key: string) => {
	return await client.get(key);
};

export const deleteKeyRedis = async (key: string) => {
	return await client.del(key);
};

export default createClientRedis;
