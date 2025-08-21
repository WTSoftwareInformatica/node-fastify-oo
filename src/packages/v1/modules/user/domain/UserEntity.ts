import { UniqueId } from "../../../shared/value-objects/uniqueIdValueObject";
import { Nome } from "../../../shared/value-objects/nomeValueObject";
import { Email } from "../../../shared/value-objects/emailValueObject";

export type UserProps = {
  id: UniqueId;
  name: Nome;
  email: Email;
  password: string;
  createdAt: Date;
};

export class UserEntity {
  private readonly props: UserProps;

  constructor(props: UserProps) {
    this.props = props;
  }

  // Getters
  get id(): UniqueId {
    return this.props.id;
  }
  get name(): Nome {
    return this.props.name;
  }
  get email(): Email {
    return this.props.email;
  }
  get password(): string {
    return this.props.password;
  } 
  get createdAt(): Date {
    return this.props.createdAt;
  }

  // Factory para criação
  static createNew(input: { name: Nome; email: Email; password: string }): UserEntity {
    return new UserEntity({
      id: new UniqueId(), // gera internamente
      name: input.name,
      email: input.email,
      password: input.password,
      createdAt: new Date(),
    });
  }
}
