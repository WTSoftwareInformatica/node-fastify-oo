import { UserEntity } from "../../domain/UserEntity";
import { UniqueId } from "../../../../shared/value-objects/uniqueIdValueObject";
import { Nome } from "../../../../shared/value-objects/nomeValueObject";
import { Email } from "../../../../shared/value-objects/emailValueObject";

type RawPersistenceUser = {
  id: string;
  name: string;
  email: string;
  hashedPassword: string;
  createdAt: Date;
};

type UserDTO = {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
};

export class UserMapper {
  // ORM → Domain
  static toDomain(raw: RawPersistenceUser): UserEntity {
    return new UserEntity({
      id: new UniqueId(raw.id),
      name: new Nome(raw.name),
      email: new Email(raw.email),
      password: raw.hashedPassword,
      createdAt: raw.createdAt,
    });
  }

  // Domain → ORM
  static toPersistence(entity: UserEntity): RawPersistenceUser {
    return {
      id: entity.id.getValue(),
      name: entity.name.getValue(),
      email: entity.email.getValue(),
      hashedPassword: entity.password,
      createdAt: entity.createdAt,
    };
  }

  // Domain → DTO (resposta da API)
  static toDTO(entity: UserEntity): UserDTO {
    return {
      id: entity.id.getValue(),
      name: entity.name.getValue(),
      email: entity.email.getValue(),
      createdAt: entity.createdAt,
    };
  }
}
