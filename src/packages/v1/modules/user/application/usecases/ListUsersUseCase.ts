import { IUserRepository } from "../contracts/IUserRepository";
import { UserEntity } from "../../domain/UserEntity";

export class ListUsersUseCase {
  constructor(private readonly repo: IUserRepository) {}

  async execute(): Promise<UserEntity[]> {
    return await this.repo.list();
  }
}
