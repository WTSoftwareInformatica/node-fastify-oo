// UpdateUserUseCase.ts
import { IUserRepository } from "../contracts/IUserRepository";
import { UpdateUserDTO } from "../../dto/UpdateUserDTO";
import { Nome } from "../../../../shared/value-objects/nomeValueObject";
import { Email } from "../../../../shared/value-objects/emailValueObject";
import { UserEntity } from "../../domain/UserEntity";
import * as bcrypt from "bcryptjs";

export class UpdateUserUseCase {
  constructor(private readonly repo: IUserRepository) {}

  async execute(id: string, data: UpdateUserDTO): Promise<UserEntity> {
    const existingUser = await this.repo.findById(id);
    if (!existingUser) {
      throw new Error("User not found");
    }

    const updatedName = data.name ? new Nome(data.name) : existingUser.name;
    const updatedmail = data.email ? new Email(data.email) : existingUser.email;

    let updatedPassword = existingUser.password;
    if (data.password) {
      updatedPassword = await bcrypt.hash(data.password, 10);
    }

    const updated = new UserEntity({
      id: existingUser.id,
      email: updatedmail,
      name: updatedName,
      password: updatedPassword,
      createdAt: existingUser.createdAt,
    });

    return await this.repo.update(updated);
  }
}
