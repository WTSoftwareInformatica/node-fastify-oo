import { CreateUserDTO } from "../../dto/CreateUserDTO";
import { IUserRepository } from "../contracts/IUserRepository";
import { UserEntity } from "../../domain/UserEntity";
import { Nome } from "../../../../shared/value-objects/nomeValueObject";
import { Email } from "../../../../shared/value-objects/emailValueObject";

export class CreateUserUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(input: CreateUserDTO): Promise<UserEntity> {
    return await this.userRepository.create({
      name: new Nome(input.name).getValue(),
      email: new Email(input.email).getValue(),
    });
  }
}
