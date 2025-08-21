import { CreateUserDTO } from "../../dto/CreateUserDTO";
import { IUserRepository } from "../contracts/IUserRepository";
import { UserEntity } from "../../domain/UserEntity";
import { UniqueId } from "../../../../shared/value-objects/uniqueIdValueObject";
import { Nome } from "../../../../shared/value-objects/nomeValueObject";
import { Email } from "../../../../shared/value-objects/emailValueObject";
import * as bcrypt from "bcryptjs";

export class CreateUserUseCase {
  constructor(private readonly repo: IUserRepository) {}

  async execute(input: CreateUserDTO): Promise<UserEntity> {
    const hashedPassword = await bcrypt.hash(input.password, 10);
    const user = UserEntity.createNew({
      name: new Nome(input.name),
      email: new Email(input.email),
      password: hashedPassword,
    });

    return await this.repo.create(user);
  }
}