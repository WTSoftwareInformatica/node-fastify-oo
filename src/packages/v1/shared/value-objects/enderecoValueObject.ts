export class Endereco {
  constructor(
    public readonly rua: string,
    public readonly numero: string,
    public readonly bairro: string,
    public readonly cidade: string,
    public readonly estado: string,
    public readonly cep: string
  ) {
    if (!this.isValidCep(cep)) {
      throw new Error('CEP inválido');
    }
  }

  private isValidCep(cep: string): boolean {
    return /^\d{5}-?\d{3}$/.test(cep);
  }

  public getFullAddress(): string {
    return `${this.rua}, ${this.numero} - ${this.bairro}, ${this.cidade} - ${this.estado}, ${this.cep}`;
  }
}