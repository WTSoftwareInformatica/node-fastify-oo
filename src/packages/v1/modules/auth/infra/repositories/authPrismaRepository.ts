// packages/v1/modules/auth/infra/AuthPrismaRepository.ts
import { PrismaClient } from "@prisma/client";
import { IAuthRepository } from "../../application/contracts/IAuthRepository";
import { UserMapper } from "../../../user/application/mappers/UserMapper";

const prisma = new PrismaClient();

export class AuthPrismaRepository implements IAuthRepository {
  async createRefreshToken(userId: string, token: string, expiresAt: Date): Promise<void> {
    await prisma.refreshToken.create({
      data: { userId, token, expiresAt },
    });
  }

  async findRefreshToken(token: string) {
    const row = await prisma.refreshToken.findUnique({
      where: { token },
      include: { user: true },
    });
    if (!row) return null;
    return {
      user: UserMapper.toDomain(row.user),
      token: row.token,
      expiresAt: row.expiresAt,
      revokedAt: row.revokedAt,
    };
    // poderia retornar um objeto VO específico, mas mantemos simples
  }

  async revokeRefreshToken(token: string): Promise<void> {
    await prisma.refreshToken.update({
      where: { token },
      data: { revokedAt: new Date() },
    });
  }

  async revokeAllForUser(userId: string): Promise<void> {
    await prisma.refreshToken.updateMany({
      where: { userId, revokedAt: null },
      data: { revokedAt: new Date() },
    });
  }
}
