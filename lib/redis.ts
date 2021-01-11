import redis from 'redis';
import { promisify } from 'util';

const client = redis.createClient({
  host: process.env.REDIS_HOST,
  port: parseInt(process.env.REDIS_PORT || '6379'),
});

client.on('error', function (error) {
  console.error(error);
});

export const getAsync = promisify(client.get).bind(client);

export default client;
