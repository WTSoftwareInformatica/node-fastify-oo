import { IUserRepository } from "../../application/contracts/IUserRepository";
import { UserEntity } from "../../domain/UserEntity";

export class UserInMemoryRepository implements IUserRepository {
  private users: UserEntity[] = [];

  async create(user: UserEntity): Promise<UserEntity> {
    this.users.push(user);
    return user;
  }

  async findById(id: string): Promise<UserEntity | null> {
    return this.users.find((u) => u.id.getValue() === id) || null;
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    return this.users.find((u) => u.email.getValue() === email) || null;
  }

  async update(user: UserEntity): Promise<UserEntity> {
    const index = this.users.findIndex((u) => u.id.getValue() === user.id.getValue());
    this.users[index] = user;
    return this.users[index];
  }

  async delete(id: string): Promise<void> {
    this.users = this.users.filter((u) => u.id.getValue() !== id);
  }

  async list(): Promise<UserEntity[]> {
    return [...this.users];
  }
}
