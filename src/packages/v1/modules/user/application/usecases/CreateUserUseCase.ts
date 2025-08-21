import { CreateUserDTO } from "../../dto/CreateUserDTO";
import { IUserRepository } from "../contracts/IUserRepository";
import { UserEntity } from "../../domain/UserEntity";
import { UniqueId } from "../../../../shared/value-objects/uniqueIdValueObject";
import { Nome } from "../../../../shared/value-objects/nomeValueObject";
import { Email } from "../../../../shared/value-objects/emailValueObject";

export class CreateUserUseCase {
  constructor(private readonly repo: IUserRepository) {}

  async execute(input: CreateUserDTO): Promise<UserEntity> {
    const entity = UserEntity.createNew({
      name: new Nome(input.name),
      email: new Email(input.email),
    });

    return await this.repo.create(entity);
  }
}