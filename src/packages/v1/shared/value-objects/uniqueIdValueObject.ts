import { randomUUID } from "crypto";

export class UniqueId {
  constructor(private readonly value: string = randomUUID()) {
    if (!value) throw new Error("Invalid ID");
  }
  getValue() {
    return this.value;
  }
}
