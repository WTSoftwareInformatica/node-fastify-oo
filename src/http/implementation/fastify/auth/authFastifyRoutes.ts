import { FastifyInstance } from "fastify";

import { authMiddleware } from "../middlewares/authMiddleware";
import { IAuthRoutes } from "../../../contracts/auth/IAuthRoutes";
import { IAuthController } from "../../../contracts/auth/IAuthController";

export class AuthFastifyRoutes implements IAuthRoutes {
  constructor(
    private readonly controller: IAuthController,
    private readonly app: FastifyInstance
  ) {}

  loginRoute(): void {
    this.app.post("/auth/login", async (req, reply) => {
      const res = await this.controller.login(req as any);
      reply.code(res.statusCode).send(res.body);
    });
  }
  refreshTokenRoute(): void {
    this.app.post("/auth/refresh", async (req, reply) => {
      const res = await this.controller.refresh(req as any);
      reply.code(res.statusCode).send(res.body);
    });
  }
  logoutRoute(): void {
    this.app.post(
      "/auth/logout",
      { preHandler: [authMiddleware] },
      async (req, reply) => {
        const res = await this.controller.logout(req as any);
        reply.code(res.statusCode).send(res.body);
      }
    );
  }

registerAuthRoutes(): void {
    this.loginRoute();
    this.refreshTokenRoute();
    this.logoutRoute();
  }
}

/*
export async function authRoutes(app: FastifyInstance) {
  const usersRepo = new UserPrismaRepository();
  const authRepo = new AuthPrismaRepository();
  const jwt = new JwtService();
  const redis = new RedisService();

  const loginUC = new LoginUseCase(usersRepo, authRepo, jwt, redis);
  const refreshUC = new RefreshTokenUseCase(authRepo, jwt, redis);
  const logoutUC = new LogoutUseCase(authRepo, redis);

  const controller = new AuthFastifyController(loginUC, refreshUC, logoutUC);

  app.post("/auth/login", async (req, reply) => {
    const res = await controller.login(req as any);
    reply.code(res.statusCode).send(res.body);
  });

  app.post("/auth/refresh", async (req, reply) => {
    const res = await controller.refresh(req as any);
    reply.code(res.statusCode).send(res.body);
  });

  app.post("/auth/logout", { preHandler: [authMiddleware] }, async (req, reply) => {
    const res = await controller.logout(req as any);
    reply.code(res.statusCode).send(res.body);
  });
}
*/
