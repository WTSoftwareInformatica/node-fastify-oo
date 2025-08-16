import { UniqueId } from "../../../shared/value-objects/uniqueIdValueObject";
import { Nome } from "../../../shared/value-objects/nomeValueObject";
import { Email } from "../../../shared/value-objects/emailValueObject";

export class UserEntity {
  constructor(
    public readonly id: UniqueId,
    public name: Nome,
    public email: Email,
    public readonly createdAt: Date
  ) {}

}

/*
export interface UserEntity {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
}
  */
