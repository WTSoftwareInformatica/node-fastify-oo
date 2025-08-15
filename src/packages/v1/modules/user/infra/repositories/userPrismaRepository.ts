import { PrismaClient } from '@prisma/client';
import { IUserRepository } from '../../application/contracts/IUserRepository';
import { CreateUserDTO } from '../../dto/CreateUserDTO';
import { UpdateUserDTO } from '../../dto/UpdateUserDTO';

const prisma = new PrismaClient();

export class UserPrismaRepository implements IUserRepository {
  async create(data: CreateUserDTO) {
    return await prisma.user.create({ data });
  }

  async findById(id: string) {
    return await prisma.user.findUnique({ where: { id } });
  }

  async update(id: string, data: UpdateUserDTO) {
    return await prisma.user.update({ where: { id }, data });
  }

  async delete(id: string) {
    await prisma.user.delete({ where: { id } });
  }

  async list() {
    return await prisma.user.findMany();
  }
}
