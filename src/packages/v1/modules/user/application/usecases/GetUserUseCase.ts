// GetUserUseCase.ts
import { IUserRepository } from '../contracts/IUserRepository';
import { UserEntity } from "../../domain/UserEntity";

export class GetUserUseCase {
  constructor(private readonly repo: IUserRepository) {}

  async execute(id: string): Promise<UserEntity | null> {
    return await this.repo.findById(id);
  }
}