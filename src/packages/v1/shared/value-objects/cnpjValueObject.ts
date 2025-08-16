export class CNPJ {
  private readonly value: string;

  constructor(cnpj: string) {
    const clean = cnpj.replace(/\D/g, '');
    if (!this.isValid(clean)) {
      throw new Error('CNPJ inválido');
    }
    this.value = clean;
  }

  private isValid(cnpj: string): boolean {
    if (cnpj.length !== 14 || /^(\d)\1+$/.test(cnpj)) return false;

    const calc = (slice: number) => {
      const weights = slice === 12 ? [5,4,3,2,9,8,7,6,5,4,3,2] : [6,5,4,3,2,9,8,7,6,5,4,3,2];
      const sum = cnpj
        .slice(0, slice)
        .split('')
        .reduce((acc, digit, i) => acc + parseInt(digit) * weights[i], 0);
      const result = sum % 11;
      return result < 2 ? 0 : 11 - result;
    };

    const digit1 = calc(12);
    const digit2 = calc(13);

    return digit1 === parseInt(cnpj[12]) && digit2 === parseInt(cnpj[13]);
  }

  public getValue(): string {
    return this.value;
  }
}