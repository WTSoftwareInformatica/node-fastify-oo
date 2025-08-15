// ListUsersUseCase.ts
import { IUserRepository } from '../contracts/IUserRepository';

export class ListUsersUseCase {
  constructor(private readonly repo: IUserRepository) {}
  async execute() {
    return await this.repo.list();
  }
}
