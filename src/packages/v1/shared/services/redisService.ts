import Redis from "ioredis";

export class RedisService {
  private client: Redis;

  constructor(url = process.env.REDIS_URL) {
    if (!url) throw new Error("REDIS_URL não definido");
    this.client = new Redis(url);
  }

  async setAccessJti(jti: string, userId: string, ttlSeconds: number): Promise<void> {
    await this.client.setex(this.key(jti), ttlSeconds, userId);
  }

  async isAccessJtiValid(jti: string): Promise<boolean> {
    const val = await this.client.get(this.key(jti));
    return !!val;
  }

  async revokeAccessJti(jti: string): Promise<void> {
    await this.client.del(this.key(jti));
  }

  private key(jti: string) {
    return `access:${jti}`;
  }
}
