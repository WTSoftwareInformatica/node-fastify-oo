import { IAuthRepository } from "../contracts/IAuthRepository";
import { JwtService } from "../../../../shared/services/jwtService";
import { RedisService } from "../../../../shared/services/redisService";

type Input = { refreshToken: string };

export class RefreshTokenUseCase {
  constructor(
    private readonly authRepo: IAuthRepository,
    private readonly jwt: JwtService,
    private readonly redis: RedisService
  ) {}

  async execute({ refreshToken }: Input) {
    const record = await this.authRepo.findRefreshToken(refreshToken);
    if (!record) throw new Error("Invalid refresh token");
    if (record.revokedAt) throw new Error("Refresh token revoked");
    if (record.expiresAt.getTime() < Date.now()) {
      throw new Error("Refresh token expired");
    }

    // (Opcional/forte) Rotação: revogar o token atual e emitir um novo
    await this.authRepo.revokeRefreshToken(refreshToken);

    const user = record.user;

    const { token: accessToken, jti, exp } = this.jwt.signAccessToken({
      sub: user.id.getValue(),
      email: user.email.getValue(),
    });
    const ttlSeconds = exp - Math.floor(Date.now() / 1000);
    await this.redis.setAccessJti(jti, user.id.getValue(), ttlSeconds);

    const { token: newRefresh, exp: newRefreshExp } = this.jwt.signRefreshToken({
      sub: user.id.getValue(),
      email: user.email.getValue(),
    });
    await this.authRepo.createRefreshToken(user.id.getValue(), newRefresh, newRefreshExp);

    return {
      accessToken,
      refreshToken: newRefresh,
      tokenType: "Bearer",
      expiresIn: ttlSeconds,
    };
  }
}
