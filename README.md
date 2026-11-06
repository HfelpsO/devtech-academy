# DevTech Academy - Gerenciamento de Alunos

Sistema simples (HTML + JavaScript puro) para cadastrar, listar, editar e excluir alunos, com relatórios.
Os dados ficam em memória (array), então são perdidos ao recarregar a página.

## Estrutura

```
devtech-academy/
├── index.html            # menu com links para os exercícios
├── Dockerfile
├── docker-compose.yml
├── exercicio-1/          # CRUD com formulário, tabela e array de objetos
├── exercicio-2/          # classe Aluno (construtor, isAprovado, toString)
├── exercicio-3/          # addEventListener, funções anônimas e arrow functions
└── exercicio-4/          # relatórios com filter, map, reduce, sort, forEach
```

Cada exercício é independente (pasta própria com seu `index.html` e scripts).

## Como rodar com Docker

```bash
docker compose up --build
```

Acesse http://localhost:8080 e escolha o exercício.
O projeto é montado como volume: edite os arquivos e apenas recarregue o navegador (Ctrl+F5 se o cache atrapalhar).

Para parar: `docker compose down`.

Sem Compose:

```bash
docker build -t devtech-academy .
docker run --rm -p 8080:80 devtech-academy
```

## Versionando e enviando para o GitHub

```bash
git init
git add .
git commit -m "feat: sistema de gerenciamento de alunos (exercícios 1 a 4)"
git branch -M main
git remote add origin https://github.com/SEU_USUARIO/devtech-academy.git
git push -u origin main
```

(Crie antes o repositório vazio `devtech-academy` no GitHub.)

## Resumo dos exercícios

| Exercício | Conceitos |
|-----------|-----------|
| 1 | Formulário sem CSS, DOM, `onclick`, array de objetos |
| 2 | Classe `Aluno`, construtor, `isAprovado()`, `toString()` |
| 3 | `addEventListener`, funções anônimas, arrow functions, `alert`/`console.log` |
| 4 | `filter`, `map`, `reduce`, `sort`, `forEach` |
