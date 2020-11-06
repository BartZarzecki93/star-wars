import redis from "redis";
import * as dotenv from "dotenv";
dotenv.config();

export const clientRedis = redis.createClient({
  port: parseInt(process.env.REDIS_PORT as string)
});
