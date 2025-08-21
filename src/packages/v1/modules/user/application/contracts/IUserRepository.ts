import { UserEntity } from "../../domain/UserEntity";

export interface IUserRepository {
  create(user: UserEntity): Promise<UserEntity>;
  findById(id: string): Promise<UserEntity | null>;
  update(user: UserEntity): Promise<UserEntity>;
  delete(id: string): Promise<void>;
  list(): Promise<UserEntity[]>;
}
