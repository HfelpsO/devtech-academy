// Exercício 2 - Classe Aluno

class Aluno {
  constructor(nome, idade, curso, notaFinal) {
    this.nome = nome;
    this.idade = idade;
    this.curso = curso;
    this.notaFinal = notaFinal;
  }

  // Aprovado quando a nota final é maior ou igual a 7
  isAprovado() {
    return this.notaFinal >= 7;
  }

  toString() {
    const situacao = this.isAprovado() ? 'Aprovado' : 'Reprovado';
    return `${this.nome} | ${this.idade} anos | Curso: ${this.curso} | Nota final: ${this.notaFinal} | ${situacao}`;
  }
}
