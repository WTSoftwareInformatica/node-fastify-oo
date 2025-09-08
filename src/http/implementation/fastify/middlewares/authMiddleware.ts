import { FastifyRequest, FastifyReply } from "fastify";
import { JwtService } from "../../../../packages/v1/shared/services/jwtService";
import { RedisService } from "../../../../packages/v1/shared/services/redisService";

const jwtService = new JwtService();
const redisService = new RedisService();

export async function authMiddleware(req: FastifyRequest, reply: FastifyReply) {
  try {
    const header = req.headers.authorization || "";
    const [, token] = header.split(" ");
    if (!token) throw new Error("Missing token");

    const payload = jwtService.verify(token);
    const jti = (payload as any).jti as string;
    if (!jti) throw new Error("Invalid token (no jti)");

    const valid = await redisService.isAccessJtiValid(jti);
    if (!valid) throw new Error("Token revoked or expired");

    // anexa info ao request
    (req as any).auth = { userId: payload.sub, jti, email: payload.email };
  } catch (e: any) {
    return reply.code(401).send({ error: e.message || "Unauthorized" });
  }
}
