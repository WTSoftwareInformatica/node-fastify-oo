import { UserEntity } from "../../../user/domain/UserEntity";

export interface IAuthRepository {
  createRefreshToken(userId: string, token: string, expiresAt: Date): Promise<void>;
  findRefreshToken(token: string): Promise<{ user: UserEntity; token: string; expiresAt: Date; revokedAt: Date | null } | null>;
  revokeRefreshToken(token: string): Promise<void>;
  revokeAllForUser(userId: string): Promise<void>; // útil para logout global/rotação
}
