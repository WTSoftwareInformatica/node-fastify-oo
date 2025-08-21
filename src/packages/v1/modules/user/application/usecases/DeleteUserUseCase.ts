import { IUserRepository } from "../contracts/IUserRepository";

export class DeleteUserUseCase {
  constructor(private readonly repo: IUserRepository) {}

  async execute(id: string): Promise<void> {
    await this.repo.delete(id);
  }
}
