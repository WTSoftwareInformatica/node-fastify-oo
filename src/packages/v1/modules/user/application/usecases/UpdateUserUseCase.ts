// UpdateUserUseCase.ts
import { IUserRepository } from '../contracts/IUserRepository';
import { UpdateUserDTO } from '../../dto/UpdateUserDTO';

export class UpdateUserUseCase {
  constructor(private readonly repo: IUserRepository) {}
  async execute(id: string, data: UpdateUserDTO) {
    return await this.repo.update(id, data);
  }
}
