// GetUserUseCase.ts
import { IUserRepository } from '../contracts/IUserRepository';

export class GetUserUseCase {
  constructor(private readonly repo: IUserRepository) {}
  async execute(id: string) {
    return await this.repo.findById(id);
  }
}