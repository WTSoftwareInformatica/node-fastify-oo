export class Nome {

  constructor(private readonly nome: string) {
    
    const trimmed = nome.trim();
    if (!nome || trimmed.length < 3 || trimmed.length > 100) {
      throw new Error('Nome precisa ter no mínimo 3 caracteres');
    }
    this.nome = trimmed;
  }

  public getValue(): string {
    return this.nome;
  }
}