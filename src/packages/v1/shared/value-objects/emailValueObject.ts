export class Email {

  constructor(private readonly value: string) {
    
    if (!this.isValid(value)) {
      throw new Error('Email inválido');
    }
    this.value = value.toLowerCase();
  }

  private isValid(email: string): boolean {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  public getValue(): string {
    return this.value;
  }
}