import { IHttpRequest } from '../../../contracts/IHttpRequest';
import { IHttpResponse } from '../../../contracts/IHttpResponse';
import { LoginUseCase } from "../../../../packages/v1/modules/auth/application/usecases/LoginUseCase";
import { RefreshTokenUseCase } from "../../../../packages/v1/modules/auth/application/usecases/RefreshTokenUseCase";
import { LogoutUseCase } from "../../../../packages/v1/modules/auth/application/usecases/LogoutUseCase";
import { IAuthController } from '../../../contracts/auth/IAuthController';

export class AuthFastifyController implements IAuthController {
  constructor(
    private readonly loginUC: LoginUseCase,
    private readonly refreshUC: RefreshTokenUseCase,
    private readonly logoutUC: LogoutUseCase
  ) {}

  async login(req: IHttpRequest): Promise<IHttpResponse> {
    try {
      const result = await this.loginUC.execute(req.body);
      return { statusCode: 200, body: result };
    } catch (error: any) {
      return { statusCode: 401, body: { error: error.message } };
    }
  }

  async refresh(req: IHttpRequest): Promise<IHttpResponse> {
    try {
      const result = await this.refreshUC.execute({ refreshToken: req.body.refreshToken });
      return { statusCode: 200, body: result };
    } catch (error: any) {
      return { statusCode: 401, body: { error: error.message } };
    }
  }

  async logout(req: IHttpRequest): Promise<IHttpResponse> {
    try {
      const { userId } = req.auth!; // preenchido pelo middleware
      const currentAccessJti = req.auth!.jti;
      const refreshToken = req.body?.refreshToken;
      await this.logoutUC.execute({ userId, currentAccessJti, refreshToken });
      return { statusCode: 204, body: null };
    } catch (error: any) {
      return { statusCode: 400, body: { error: error.message } };
    }
  }
}
