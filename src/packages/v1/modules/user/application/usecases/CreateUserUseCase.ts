// CreateUserUseCase.ts
import { IUserRepository } from '../contracts/IUserRepository';
import { CreateUserDTO } from '../../dto/CreateUserDTO';

export class CreateUserUseCase {
  constructor(private readonly repo: IUserRepository) {}
  async execute(data: CreateUserDTO) {
    return await this.repo.create(data);
  }
}
