// Exercício 3 - addEventListener, funções anônimas e arrow functions

const alunos = [];
let indiceEdicao = null;

// ---------- Arrow functions: manipulação dos dados ----------
const campo = (id) => document.getElementById(id);

const lerFormulario = () => ({
  nome: campo('nome').value.trim(),
  idade: campo('idade').value,
  curso: campo('curso').value,
  notaFinal: campo('notaFinal').value
});

const formularioValido = (dados) => {
  if (dados.nome === '') return 'Informe o nome do aluno.';
  if (dados.idade === '' || Number(dados.idade) <= 0) return 'Informe uma idade válida.';
  if (dados.notaFinal === '' || Number(dados.notaFinal) < 0 || Number(dados.notaFinal) > 10) {
    return 'A nota final deve estar entre 0 e 10.';
  }
  return null; // sem erros
};

const criarAluno = (dados) =>
  new Aluno(dados.nome, Number(dados.idade), dados.curso, Number(dados.notaFinal));

const adicionarAluno = (aluno) => alunos.push(aluno);
const atualizarAluno = (indice, aluno) => { alunos[indice] = aluno; };
const removerAluno = (indice) => alunos.splice(indice, 1);

const limparFormulario = () => campo('form-aluno').reset();

const entrarNoModoEdicao = (indice) => {
  indiceEdicao = indice;
  campo('btn-salvar').textContent = 'Salvar alterações';
  campo('btn-cancelar').hidden = false;
};

const sairDoModoEdicao = () => {
  indiceEdicao = null;
  campo('btn-salvar').textContent = 'Cadastrar';
  campo('btn-cancelar').hidden = true;
  limparFormulario();
};

const carregarNoFormulario = (aluno) => {
  campo('nome').value = aluno.nome;
  campo('idade').value = aluno.idade;
  campo('curso').value = aluno.curso;
  campo('notaFinal').value = aluno.notaFinal;
};

const criarCelula = (texto) => {
  const td = document.createElement('td');
  td.textContent = texto;
  return td;
};

const renderizar = () => {
  const tbody = campo('tabela-alunos');
  tbody.innerHTML = '';

  alunos.forEach((aluno, indice) => {
    const tr = document.createElement('tr');
    tr.appendChild(criarCelula(aluno.nome));
    tr.appendChild(criarCelula(aluno.idade));
    tr.appendChild(criarCelula(aluno.curso));
    tr.appendChild(criarCelula(aluno.notaFinal));
    tr.appendChild(criarCelula(aluno.isAprovado() ? 'Aprovado' : 'Reprovado'));

    const tdAcoes = document.createElement('td');

    const btnEditar = document.createElement('button');
    btnEditar.textContent = 'Editar';
    // Função anônima no evento de clique
    btnEditar.addEventListener('click', function () {
      carregarNoFormulario(alunos[indice]);
      entrarNoModoEdicao(indice);
      console.log('Editando aluno:', alunos[indice].nome);
    });

    const btnExcluir = document.createElement('button');
    btnExcluir.textContent = 'Excluir';
    btnExcluir.addEventListener('click', function () {
      const [removido] = removerAluno(indice);
      if (indiceEdicao !== null) sairDoModoEdicao();
      renderizar();
      alert(`Aluno "${removido.nome}" excluído com sucesso!`);
    });

    tdAcoes.append(btnEditar, btnExcluir);
    tr.appendChild(tdAcoes);
    tbody.appendChild(tr);
  });
};

// ---------- Escutadores de eventos dos botões do formulário ----------
campo('btn-salvar').addEventListener('click', function () {
  const dados = lerFormulario();
  const erro = formularioValido(dados);
  if (erro) {
    alert(erro);
    return;
  }

  const aluno = criarAluno(dados);

  if (indiceEdicao === null) {
    adicionarAluno(aluno);
    alert(`Aluno "${aluno.nome}" cadastrado com sucesso!`);
  } else {
    atualizarAluno(indiceEdicao, aluno);
    alert(`Aluno "${aluno.nome}" atualizado com sucesso!`);
    sairDoModoEdicao();
  }

  limparFormulario();
  renderizar();
});

campo('btn-cancelar').addEventListener('click', function () {
  sairDoModoEdicao();
  console.log('Edição cancelada.');
});

renderizar();
