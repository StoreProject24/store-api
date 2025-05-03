import logger from '~config/logger/logger';
import { createClient } from 'redis';

let client: any;

const createClientRedis = async () => {
  console.log('process.env.REDIS_URL', process.env.REDIS_URL);
  client = await createClient({
    url: process.env.REDIS_URL,
  })
    .on('connect', () => logger.info('Redis Client connect'))
    .on('error', (err) => logger.error('Redis Client Error', err))
    .connect();
};
export const setKeyRedis = async (key: string, value: string) => {
  await client.set(key, value, { EX: 60 * 60 * 12 });
};

export const getKeyRedis = async (key: string) => {
  return await client.get(key);
};

export const deleteKeyRedis = async (key: string) => {
  return await client.del(key);
};

export default createClientRedis;
