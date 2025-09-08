import { LoginUseCase } from "../../../../packages/v1/modules/auth/application/usecases/LoginUseCase";
import { LogoutUseCase } from "../../../../packages/v1/modules/auth/application/usecases/LogoutUseCase";
import { RefreshTokenUseCase } from "../../../../packages/v1/modules/auth/application/usecases/RefreshTokenUseCase";
import { AuthPrismaRepository } from "../../../../packages/v1/modules/auth/infra/repositories/authPrismaRepository";
import { UserPrismaRepository } from "../../../../packages/v1/modules/user/infra/repositories/userPrismaRepository";
import { JwtService } from "../../../../packages/v1/shared/services/jwtService";
import { RedisService } from "../../../../packages/v1/shared/services/redisService";
import { IAuthController } from "../../../contracts/auth/IAuthController";
import { IAuthFactory } from "../../../contracts/auth/IAuthFactory";
import { IAuthRoutes } from "../../../contracts/auth/IAuthRoutes";
import { AuthFastifyController } from "./authFastifyController";
import { AuthFastifyRoutes } from "./authFastifyRoutes";

export class AuthFastifyFactory implements IAuthFactory {
  makeAuthController(): IAuthController {
    const authRepository = new AuthPrismaRepository();
    const userRepository = new UserPrismaRepository();

    const jwt = new JwtService();
    const redis = new RedisService();

    const loginUC = new LoginUseCase(
      userRepository,
      authRepository,
      jwt,
      redis
    );
    const refreshUC = new RefreshTokenUseCase(authRepository, jwt, redis);
    const logoutUC = new LogoutUseCase(authRepository, redis);

    return new AuthFastifyController(loginUC, refreshUC, logoutUC);
  }

  makeAuthRoutes(app: any): IAuthRoutes {
    const controller = this.makeAuthController();
    return new AuthFastifyRoutes(controller, app);
  }

  registerAuthRoutes(app: any): Promise<void> {
    const routes = this.makeAuthRoutes(app);
    routes.registerAuthRoutes();
    return Promise.resolve();
  }
}
