import { PrismaClient } from '@prisma/client';
import { IUserRepository } from '../../application/contracts/IUserRepository';
import { CreateUserDTO } from '../../dto/CreateUserDTO';
import { UpdateUserDTO } from '../../dto/UpdateUserDTO';
import { UserMapper } from '../../application/mappers/UserMapper';

const prisma = new PrismaClient();

export class UserPrismaRepository implements IUserRepository {
  
  async create(data: CreateUserDTO) {
    const user = await prisma.user.create({ data });
    return UserMapper.toDomain(user);
  }

  async findById(id: string) {
    const user = await prisma.user.findUnique({ where: { id } });
    return user ? UserMapper.toDomain(user) : null;
  }

  async update(id: string, data: UpdateUserDTO) {
    const user = await prisma.user.update({ where: { id }, data });
    return UserMapper.toDomain(user);
  }

  async delete(id: string) {
    await prisma.user.delete({ where: { id } });
  }

  async list() {
    const users = await prisma.user.findMany();
    return users.map(UserMapper.toDomain);
  }
}
