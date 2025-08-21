// UpdateUserUseCase.ts
import { IUserRepository } from "../contracts/IUserRepository";
import { UpdateUserDTO } from "../../dto/UpdateUserDTO";
import { Nome } from "../../../../shared/value-objects/nomeValueObject";
import { Email } from "../../../../shared/value-objects/emailValueObject";
import { UserEntity } from "../../domain/UserEntity";

export class UpdateUserUseCase {
  constructor(private readonly repo: IUserRepository) {}

  async execute(id: string, data: UpdateUserDTO): Promise<UserEntity> {
    const existing = await this.repo.findById(id);
    if (!existing) {
      throw new Error("User not found");
    }

    const name = data.name ? new Nome(data.name) : existing.name;
    const email = data.email ? new Email(data.email) : existing.email;

    const updated = new UserEntity({
      id: existing.id,
      name,
      email,
      createdAt: existing.createdAt,
    });

    return await this.repo.update(updated);
  }
}