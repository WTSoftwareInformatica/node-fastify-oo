// packages/v1/modules/user/infra/database/UserPrismaRepository.ts
import { PrismaClient } from "@prisma/client";
import { IUserRepository } from "../../application/contracts/IUserRepository";
import { UserEntity } from "../../domain/UserEntity";
import { UserMapper } from "../../application/mappers/UserMapper";

const prisma = new PrismaClient();

export class UserPrismaRepository implements IUserRepository {

  async create(user: UserEntity): Promise<UserEntity> {
    const created = await prisma.user.create({
      data: {
        name: user.name.getValue(),
        email: user.email.getValue(),
        hashedPassword: user.password,
        createdAt: user.createdAt,
      },
    });

    return UserMapper.toDomain(created);
  }


async findById(id: string): Promise<UserEntity | null> {
    const found = await prisma.user.findUnique({ where: { id } });
    return found ? UserMapper.toDomain(found) : null;
  }

async findByEmail(email: string): Promise<UserEntity | null> {
    const found = await prisma.user.findUnique({ where: { email } });
    return found ? UserMapper.toDomain(found) : null;
  }

async update(user: UserEntity): Promise<UserEntity> {
    const updated = await prisma.user.update({
      where: { id: user.id.getValue() },
      data: {
        name: user.name.getValue(),
        email: user.email.getValue(),
        hashedPassword: user.password,
      },
    });
    return UserMapper.toDomain(updated);
  }

  async delete(id: string): Promise<void> {
    await prisma.user.delete({ where: { id } });
  }

  async list(): Promise<UserEntity[]> {
    const rows = await prisma.user.findMany();
    return rows.map(UserMapper.toDomain);
  }
}
