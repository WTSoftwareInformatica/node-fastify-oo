import { IUserRepository } from "../../../user/application/contracts/IUserRepository";
import { IAuthRepository } from "../contracts/IAuthRepository";
import { JwtService } from "../../../../shared/services/jwtService";
import { RedisService } from "../../../../shared/services/redisService";
import * as bcrypt from "bcryptjs";

type LoginDTO = { email: string; password: string };

export class LoginUseCase {
  constructor(
    private readonly users: IUserRepository,
    private readonly authRepo: IAuthRepository,
    private readonly jwt: JwtService,
    private readonly redis: RedisService
  ) {}

  async execute(input: LoginDTO) {
    const user = await this.users.findByEmail(input.email);
    if (!user) throw new Error("Invalid credentials");

    const ok = await bcrypt.compare(input.password, user.password);
    if (!ok) throw new Error("Invalid credentials");

    // Access token (2h) + armazena JTI no Redis
    const { token: accessToken, jti, exp } = this.jwt.signAccessToken({
      sub: user.id.getValue(),
      email: user.email.getValue(),
    });
    const ttlSeconds = exp - Math.floor(Date.now() / 1000);
    await this.redis.setAccessJti(jti, user.id.getValue(), ttlSeconds);

    // Refresh token (ex.: 7d) + grava no banco
    const { token: refreshToken, exp: refreshExp } = this.jwt.signRefreshToken({
      sub: user.id.getValue(),
      email: user.email.getValue(),
    });
    await this.authRepo.createRefreshToken(user.id.getValue(), refreshToken, refreshExp);

    return {
      accessToken,
      refreshToken,
      tokenType: "Bearer",
      expiresIn: ttlSeconds,
      user: {
        id: user.id.getValue(),
        name: user.name.getValue(),
        email: user.email.getValue(),
      },
    };
  }
}
