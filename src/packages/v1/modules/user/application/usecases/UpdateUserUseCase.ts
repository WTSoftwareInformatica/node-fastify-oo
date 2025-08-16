// UpdateUserUseCase.ts
import { IUserRepository } from "../contracts/IUserRepository";
import { UpdateUserDTO } from "../../dto/UpdateUserDTO";
import { Nome } from "../../../../shared/value-objects/nomeValueObject";
import { Email } from "../../../../shared/value-objects/emailValueObject";

export class UpdateUserUseCase {
  constructor(private readonly repo: IUserRepository) {}

  async execute(id: string, data: UpdateUserDTO) {
    // Buscar usuário existente
    const existingUser = await this.repo.findById(id);
    if (!existingUser) {
      throw new Error("User not found");
    }

    // Criar novos VOs apenas se o campo for informado
    const updatedName = data.name ? new Nome(data.name) : existingUser.name;
    const updatedEmail = data.email
      ? new Email(data.email)
      : existingUser.email;

    // Persistir no repositório
    return await this.repo.update(id, {
      name: updatedName.getValue(),
      email: updatedEmail.getValue(),
    });
  }
}
