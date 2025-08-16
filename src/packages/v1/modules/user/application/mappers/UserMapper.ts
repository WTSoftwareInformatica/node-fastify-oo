import { UserEntity } from "../../domain/UserEntity";
import { UniqueId } from "../../../../shared/value-objects/uniqueIdValueObject";
import { Nome } from "../../../../shared/value-objects/nomeValueObject";
import { Email } from "../../../../shared/value-objects/emailValueObject";

export class UserMapper {
  static toDomain(raw: any): UserEntity {
    return new UserEntity(
      new UniqueId(raw.id),
      new Nome(raw.name),
      new Email(raw.email),
      raw.createdAt
    );
  }

  static toPersistence(entity: UserEntity): any {
    return {
      id: entity.id.getValue(),
      name: entity.name.getValue(),
      email: entity.email.getValue(),
      createdAt: entity.createdAt,
    };
  }

  static toDTO(entity: UserEntity): any {
    return {
      id: entity.id.getValue(),
      name: entity.name.getValue(),
      email: entity.email.getValue(),
      createdAt: entity.createdAt,
    };
  }
}