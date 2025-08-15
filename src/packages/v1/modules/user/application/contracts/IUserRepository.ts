import { CreateUserDTO } from '../../dto/CreateUserDTO';
import { UpdateUserDTO } from '../../dto/UpdateUserDTO';
import { UserEntity } from '../../domain/UserEntity';

export interface IUserRepository {
  create(data: CreateUserDTO): Promise<UserEntity>;
  findById(id: string): Promise<UserEntity | null>;
  update(id: string, data: UpdateUserDTO): Promise<UserEntity>;
  delete(id: string): Promise<void>;
  list(): Promise<UserEntity[]>;
}
