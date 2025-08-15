// DeleteUserUseCase.ts
import { IUserRepository } from '../contracts/IUserRepository';

export class DeleteUserUseCase {
  constructor(private readonly repo: IUserRepository) {}
  async execute(id: string) {
    await this.repo.delete(id);
  }
}
