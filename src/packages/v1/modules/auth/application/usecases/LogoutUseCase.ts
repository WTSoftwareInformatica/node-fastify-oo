import { IAuthRepository } from "../contracts/IAuthRepository";
import { RedisService } from "../../../../shared/services/redisService";

type Input = {
  userId: string;
  refreshToken?: string; // se enviar, revogamos específico; se não, revogamos todos
  currentAccessJti?: string; // do header Authorization (jti)
};

export class LogoutUseCase {
  constructor(
    private readonly authRepo: IAuthRepository,
    private readonly redis: RedisService
  ) {}

  async execute({ userId, refreshToken, currentAccessJti }: Input): Promise<void> {
    if (refreshToken) {
      await this.authRepo.revokeRefreshToken(refreshToken);
    } else {
      await this.authRepo.revokeAllForUser(userId);
    }
    if (currentAccessJti) {
      await this.redis.revokeAccessJti(currentAccessJti);
    }
  }
}
