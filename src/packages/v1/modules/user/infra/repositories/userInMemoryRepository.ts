import { IUserRepository } from "../../application/contracts/IUserRepository";
import { CreateUserDTO } from "../../dto/CreateUserDTO";
import { UpdateUserDTO } from "../../dto/UpdateUserDTO";
import { UserEntity } from "../../domain/UserEntity";
import { randomUUID } from "crypto";

export class UserInMemoryRepository implements IUserRepository {
  private users: UserEntity[] = [];

  async create(data: CreateUserDTO): Promise<UserEntity> {
    const user: UserEntity = {
      id: randomUUID(),
      ...data,
      createdAt: new Date(),
    };
    this.users.push(user);
    return user;
  }

  async findById(id: string): Promise<UserEntity | null> {
    return this.users.find((u) => u.id === id) || null;
  }

  async update(id: string, data: UpdateUserDTO): Promise<UserEntity> {
    const index = this.users.findIndex((u) => u.id === id);
    if (index === -1) throw new Error("Usuário não encontrado");
    this.users[index] = { ...this.users[index], ...data };
    return this.users[index];
  }

  async delete(id: string): Promise<void> {
    this.users = this.users.filter((u) => u.id !== id);
  }

  async list(): Promise<UserEntity[]> {
    return [...this.users];
  }
}
