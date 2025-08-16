import { IUserRepository } from "../../application/contracts/IUserRepository";
import { CreateUserDTO } from "../../dto/CreateUserDTO";
import { UpdateUserDTO } from "../../dto/UpdateUserDTO";
import { UserEntity } from "../../domain/UserEntity";
import { randomUUID } from "crypto";
import { UniqueId } from "../../../../shared/value-objects/uniqueIdValueObject";
import { Nome } from "../../../../shared/value-objects/nomeValueObject";
import { Email } from "../../../../shared/value-objects/emailValueObject";
import { UserMapper } from '../../application/mappers/UserMapper';

export class UserInMemoryRepository implements IUserRepository {
  private users: UserEntity[] = [];

  async create(data: CreateUserDTO): Promise<UserEntity> {
    const user: UserEntity = {
      id: new UniqueId(),
      name: new Nome(data.name),
      email: new Email(data.email),
      createdAt: new Date(),
    };
    this.users.push(user);
    return user;
  }

  async findById(id: string): Promise<UserEntity | null> {
    return this.users.find((u) => u.id.getValue() === id) || null;
  }

  async update(id: string, data: UpdateUserDTO): Promise<UserEntity> {
    const index = this.users.findIndex((u) => u.id.getValue() === id);
    const user: UserEntity = {
      id: this.users[index].id,
      name: data.name ? new Nome(data.name) : this.users[index].name,
      email: data.email ? new Email(data.email) : this.users[index].email,
      createdAt: this.users[index].createdAt,
    };
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
