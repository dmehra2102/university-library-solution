import redis from "@/database/redis";
import { Ratelimit } from "@upstash/ratelimit";

// Create a new ratelimiter, that allows 10 requests per minute
const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.fixedWindow(10, "1m"),
  analytics: true,
  prefix: "@upstash/ratelimit",
});

export default ratelimit;
