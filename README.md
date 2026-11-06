# DevTech Academy - Gerenciamento de Alunos

Projeto desenvolvido por mim como atividade prática de JavaScript. O objetivo é simular um sistema simples para a escola fictícia **DevTech Academy**, onde é possível cadastrar, listar, editar e excluir alunos, além de gerar relatórios a partir dos dados cadastrados.

Fiz o projeto em quatro etapas (exercícios), cada uma evoluindo a anterior. Cada exercício está em uma pasta própria e funciona de forma independente.

## Tecnologias utilizadas

- HTML5
- JavaScript (puro, sem bibliotecas ou frameworks)
- Docker e Docker Compose (Nginx para servir os arquivos)
- Git e GitHub para versionamento

## Estrutura do projeto

```
devtech-academy/
├── index.html            # menu com links para os exercícios
├── Dockerfile
├── docker-compose.yml
├── exercicio-1/          # CRUD com formulário, tabela e array de objetos
├── exercicio-2/          # classe Aluno (construtor, isAprovado, toString)
├── exercicio-3/          # addEventListener, funções anônimas e arrow functions
└── exercicio-4/          # relatórios com filter, map, reduce, sort e forEach
```

## O que fiz em cada exercício

### Exercício 1 - Cadastro de alunos (CRUD)
Criei um formulário HTML (sem CSS) com nome, idade, curso (JavaScript, Python ou Java) e nota final. Os alunos cadastrados são guardados em um array de objetos e exibidos em uma tabela, com botões **Editar** e **Excluir** em cada linha. Usei manipulação de DOM e eventos `onclick`.

### Exercício 2 - Classe `Aluno`
Refatorei o sistema para usar a classe `Aluno`, com os atributos `nome`, `idade`, `curso` e `notaFinal`, o construtor, o método `isAprovado()` (aprovado quando a nota final é maior ou igual a 7) e o método `toString()`, que retorna os dados formatados.

### Exercício 3 - Eventos, funções anônimas e arrow functions
Passei a usar `addEventListener` nos botões do formulário e da tabela, funções anônimas nos eventos de clique e arrow functions nas operações de manipulação dos dados. Ao salvar, editar ou excluir um aluno, o sistema exibe mensagens com `alert()` e `console.log()`.

### Exercício 4 - Relatórios
Implementei relatórios usando `filter`, `map`, `reduce`, `sort` e `forEach`:
- lista de alunos aprovados (nota final >= 7);
- média das notas finais;
- média das idades;
- nomes dos alunos em ordem alfabética;
- quantidade de alunos por curso.

Os relatórios se atualizam automaticamente quando os dados mudam.

## Como executar

### Pré-requisitos
- [Git](https://git-scm.com/)
- [Docker Desktop](https://www.docker.com/products/docker-desktop)

### Passo a passo

1. Clone o repositório:
   ```bash
   git clone https://github.com/HfelpsO/devtech-academy.git
   cd devtech-academy
   ```

2. Suba o container:
   ```bash
   docker compose up --build
   ```

3. Abra o navegador em **http://localhost:8080** e escolha o exercício.

4. Para parar o container, use `Ctrl + C` e depois:
   ```bash
   docker compose down
   ```

Também é possível rodar sem o Compose:
```bash
docker build -t devtech-academy .
docker run --rm -p 8080:80 devtech-academy
```

> Durante o desenvolvimento, o projeto é montado como volume no container. Ao alterar um arquivo, basta recarregar a página no navegador (`Ctrl + F5` se o cache atrapalhar).

## Observações

- Os dados ficam armazenados **somente em memória** (em um array), como pedido no enunciado. Por isso, ao recarregar a página ou fechar o navegador, os cadastros são perdidos.

## Autor

Desenvolvido por **HfelpsO** - [github.com/HfelpsO](https://github.com/HfelpsO)
