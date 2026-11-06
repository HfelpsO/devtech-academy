// Exercício 4 - CRUD + relatórios com filter, map, reduce, sort e forEach

const alunos = [];
let indiceEdicao = null;
let relatorioAtual = null; // função que gera o relatório aberto, para atualizá-lo automaticamente

// ---------- Utilidades e manipulação dos dados ----------
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
  return null;
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

// ---------- Renderização da tabela ----------
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
      atualizarTela();
      alert(`Aluno "${removido.nome}" excluído com sucesso!`);
    });

    tdAcoes.append(btnEditar, btnExcluir);
    tr.appendChild(tdAcoes);
    tbody.appendChild(tr);
  });
};

// ---------- Relatórios ----------
const mostrarRelatorio = (titulo, linhas) => {
  const area = campo('relatorio');
  area.innerHTML = '';

  const h3 = document.createElement('h3');
  h3.textContent = titulo;

  const ul = document.createElement('ul');
  linhas.forEach((linha) => {
    const li = document.createElement('li');
    li.textContent = linha;
    ul.appendChild(li);
  });

  area.append(h3, ul);
};

const SEM_ALUNOS = ['Nenhum aluno cadastrado.'];

const relatorioAprovados = () => {
  const aprovados = alunos.filter((aluno) => aluno.isAprovado());
  const linhas = aprovados.length
    ? aprovados.map((aluno) => aluno.toString())
    : ['Nenhum aluno aprovado.'];
  mostrarRelatorio('Alunos aprovados (nota final >= 7)', linhas);
};

const relatorioMediaNotas = () => {
  if (alunos.length === 0) return mostrarRelatorio('Média das notas finais', SEM_ALUNOS);
  const soma = alunos.reduce((total, aluno) => total + aluno.notaFinal, 0);
  mostrarRelatorio('Média das notas finais', [(soma / alunos.length).toFixed(2)]);
};

const relatorioMediaIdades = () => {
  if (alunos.length === 0) return mostrarRelatorio('Média das idades', SEM_ALUNOS);
  const soma = alunos.reduce((total, aluno) => total + aluno.idade, 0);
  mostrarRelatorio('Média das idades', [`${(soma / alunos.length).toFixed(1)} anos`]);
};

const relatorioOrdemAlfabetica = () => {
  if (alunos.length === 0) return mostrarRelatorio('Nomes em ordem alfabética', SEM_ALUNOS);
  const nomes = alunos
    .map((aluno) => aluno.nome)
    .sort((a, b) => a.localeCompare(b, 'pt-BR'));
  mostrarRelatorio('Nomes em ordem alfabética', nomes);
};

const relatorioPorCurso = () => {
  if (alunos.length === 0) return mostrarRelatorio('Quantidade de alunos por curso', SEM_ALUNOS);
  const contagem = alunos.reduce((acc, aluno) => {
    acc[aluno.curso] = (acc[aluno.curso] || 0) + 1;
    return acc;
  }, {});
  const linhas = [];
  Object.entries(contagem).forEach(([curso, quantidade]) => {
    linhas.push(`${curso}: ${quantidade}`);
  });
  mostrarRelatorio('Quantidade de alunos por curso', linhas);
};

// Atualiza tabela e o relatório aberto (se houver) após qualquer mudança nos dados
const atualizarTela = () => {
  renderizar();
  if (relatorioAtual) relatorioAtual();
};

const abrirRelatorio = (funcaoRelatorio) => {
  relatorioAtual = funcaoRelatorio;
  funcaoRelatorio();
};

// ---------- Eventos ----------
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
  atualizarTela();
});

campo('btn-cancelar').addEventListener('click', function () {
  sairDoModoEdicao();
});

campo('btn-aprovados').addEventListener('click', () => abrirRelatorio(relatorioAprovados));
campo('btn-media-notas').addEventListener('click', () => abrirRelatorio(relatorioMediaNotas));
campo('btn-media-idades').addEventListener('click', () => abrirRelatorio(relatorioMediaIdades));
campo('btn-ordem-alfabetica').addEventListener('click', () => abrirRelatorio(relatorioOrdemAlfabetica));
campo('btn-por-curso').addEventListener('click', () => abrirRelatorio(relatorioPorCurso));

renderizar();
