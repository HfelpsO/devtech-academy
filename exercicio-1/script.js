// Exercício 1 - CRUD de alunos com array de objetos (armazenamento em memória)

const alunos = [];
let indiceEdicao = null; // null = modo cadastro; número = editando esse índice

function lerFormulario() {
  return {
    nome: document.getElementById('nome').value.trim(),
    idade: document.getElementById('idade').value,
    curso: document.getElementById('curso').value,
    notaFinal: document.getElementById('notaFinal').value
  };
}

function validar(dados) {
  if (dados.nome === '') {
    alert('Informe o nome do aluno.');
    return false;
  }
  if (dados.idade === '' || Number(dados.idade) <= 0) {
    alert('Informe uma idade válida.');
    return false;
  }
  if (dados.notaFinal === '' || Number(dados.notaFinal) < 0 || Number(dados.notaFinal) > 10) {
    alert('A nota final deve estar entre 0 e 10.');
    return false;
  }
  return true;
}

function limparFormulario() {
  document.getElementById('form-aluno').reset();
}

function cadastrar() {
  const dados = lerFormulario();
  if (!validar(dados)) return;

  const aluno = {
    nome: dados.nome,
    idade: Number(dados.idade),
    curso: dados.curso,
    notaFinal: Number(dados.notaFinal)
  };

  if (indiceEdicao === null) {
    alunos.push(aluno);
  } else {
    alunos[indiceEdicao] = aluno;
    sairDoModoEdicao();
  }

  limparFormulario();
  renderizar();
}

function editar(indice) {
  const aluno = alunos[indice];
  document.getElementById('nome').value = aluno.nome;
  document.getElementById('idade').value = aluno.idade;
  document.getElementById('curso').value = aluno.curso;
  document.getElementById('notaFinal').value = aluno.notaFinal;

  indiceEdicao = indice;
  document.getElementById('btn-salvar').textContent = 'Salvar alterações';
  document.getElementById('btn-cancelar').hidden = false;
}

function sairDoModoEdicao() {
  indiceEdicao = null;
  document.getElementById('btn-salvar').textContent = 'Cadastrar';
  document.getElementById('btn-cancelar').hidden = true;
}

function cancelarEdicao() {
  sairDoModoEdicao();
  limparFormulario();
}

function excluir(indice) {
  alunos.splice(indice, 1);
  if (indiceEdicao !== null) cancelarEdicao(); // índices mudaram
  renderizar();
}

function criarCelula(texto) {
  const td = document.createElement('td');
  td.textContent = texto;
  return td;
}

function renderizar() {
  const tbody = document.getElementById('tabela-alunos');
  tbody.innerHTML = '';

  alunos.forEach(function (aluno, indice) {
    const tr = document.createElement('tr');
    tr.appendChild(criarCelula(aluno.nome));
    tr.appendChild(criarCelula(aluno.idade));
    tr.appendChild(criarCelula(aluno.curso));
    tr.appendChild(criarCelula(aluno.notaFinal));

    const tdAcoes = document.createElement('td');

    const btnEditar = document.createElement('button');
    btnEditar.textContent = 'Editar';
    btnEditar.onclick = function () { editar(indice); };

    const btnExcluir = document.createElement('button');
    btnExcluir.textContent = 'Excluir';
    btnExcluir.onclick = function () { excluir(indice); };

    tdAcoes.appendChild(btnEditar);
    tdAcoes.appendChild(btnExcluir);
    tr.appendChild(tdAcoes);

    tbody.appendChild(tr);
  });
}

renderizar();
