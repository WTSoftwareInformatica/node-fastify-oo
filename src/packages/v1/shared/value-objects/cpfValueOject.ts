export class CPF {
  private readonly value: string;

  constructor(cpf: string) {
    const clean = cpf.replace(/\D/g, '');
    if (!this.isValid(clean)) {
      throw new Error('CPF inválido');
    }
    this.value = clean;
  }

  private isValid(cpf: string): boolean {
    if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;

    const calc = (factor: number) =>
      cpf
        .slice(0, factor - 1)
        .split('')
        .reduce((sum, digit, i) => sum + parseInt(digit) * (factor - i), 0);

    const digit1 = ((calc(10) * 10) % 11) % 10;
    const digit2 = ((calc(11) * 10) % 11) % 10;

    return digit1 === parseInt(cpf[9]) && digit2 === parseInt(cpf[10]);
  }

  public getValue(): string {
    return this.value;
  }
}