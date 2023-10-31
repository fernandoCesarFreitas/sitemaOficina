let authorization = localStorage.getItem('authorization'); //busca o token do localStorage

if (!authorization) {
  window.location.href = 'login.html'; //se nao tiver volta para a atela de login
}

async function buscarUsuarios() {
  let resposta = await fetch('http://localhost:3000/usuarios', {

    headers: {
      'Content-Type': 'application/json', //o que esta enviando
      'Accept': 'application/json', //o que ira aceitar receber
      'Authorization': authorization, // passamos o authorization junto com o header
    },
  });

  let usuarios = await resposta.json();

  let corpoTabela = document.getElementById('corpo-tabela');

  for (let usuario of usuarios) {
    let tr = document.createElement('tr');
    let tdNome = document.createElement('td');
    let tdEmail = document.createElement('td');
    let tdSenha = document.createElement('td');
    let tdAcoes = document.createElement('td')

    tdNome.innerText = usuario.nome;
    tdEmail.innerText = usuario.email;
    tdSenha.innerText = usuario.senha;
    tdAcoes.innerHTML = `<a href="cadUsuario.html?id=${usuario.id}" on-click= buscarPermissoess(usuario.id) class="btn btn-warning">Editar</a>
        <button onclick="excluir(${usuario.id})"  class="btn btn-danger">excluir</button>`; //cria uma ancora de edicao

    tr.appendChild(tdNome);
    tr.appendChild(tdEmail);
    tr.appendChild(tdSenha);
    tr.appendChild(tdAcoes);

    corpoTabela.appendChild(tr);
   
  }
}
// 
async function buscarPaginas() {
  let resposta = await fetch('http://localhost:3000/paginas', {

    headers: {
      'Content-Type': 'application/json', //o que esta enviando
      'Accept': 'application/json', //o que ira aceitar receber
      'Authorization': authorization, // passamos o authorization junto com o header
    },
  });

  let paginas = await resposta.json();

  let corpoTabela = document.getElementById('corpo-tabela-paginas');

  for (let pagina of paginas) {
    let tr = document.createElement('tr');
    let tdId = document.createElement('td');
    let tdNome = document.createElement('td');
    let tdAcoes = document.createElement('td')

    tdId.innerText = pagina.id;
    tdNome.innerText = pagina.nome;
    tdAcoes.innerHTML = `<a href="cadPaginas.html?id=${pagina.id}" class="btn btn-warning">Editar</a>
        <button onclick="excluirPages(${pagina.id})"  class="btn btn-danger">excluir</button>`; //cria uma ancora de edicao

        tr.appendChild(tdId);
        tr.appendChild(tdNome);
        tr.appendChild(tdAcoes);

    corpoTabela.appendChild(tr);
  }
}


async function buscarPermissoess(id) {
  let resposta = await fetch(`http://localhost:3000/permissoes/:${id}`, {

    headers: {
      'Content-Type': 'application/json', //o que esta enviando
      'Accept': 'application/json', //o que ira aceitar receber
      'Authorization': authorization, // passamos o authorization junto com o header
    },
  });

  let permissoes = await resposta.json();

  let corpoTabela = document.getElementById('corpo-tabela-permissoes');

  for (let permissao of permissoes) {
    let tr = document.createElement('tr');
    let tdId = document.createElement('td');
    let tdtipo = document.createElement('td');
    let tdpagina = document.createElement('td');
    let tdAcoes = document.createElement('td')

    tdId.innerText = permissao.id;
    tdtipo.innerText = permissao.tipo;
    tdpagina.innerText = permissao.pagina;
    tdAcoes.innerHTML = `<a href="cadPermissoes.html?id=${permissao.id}" class="btn btn-warning">Editar</a>
        <button onclick="excluirPages(${permissao.id})"  class="btn btn-danger">excluir</button>`; //cria uma ancora de edicao

        tr.appendChild(tdId);
        tr.appendChild(tdtipo);
        tr.appendChild(tdpagina);
        tr.appendChild(tdAcoes);

    corpoTabela.appendChild(tr);
  }
}
//if(confirm('Deseja realmente excluir?'){}

async function excluir(id) {
  await fetch('http://localhost:3000/usuarios/' + id, {
    method: 'Delete',
    headers: {
      'Content-Type': 'application/json', //o que esta enviando
      'Accept': 'application/json', //o que ira aceitar receber
      'Authorization': authorization, // passamos o authorization junto com o header
    },
  });
  window.location.reload();
}
async function excluirPages(id) {
  console.log(id)
  await fetch('http://localhost:3000/paginas/' + id, {
    method: 'Delete',
    headers: {
      'Content-Type': 'application/json', //o que esta enviando
      'Accept': 'application/json', //o que ira aceitar receber
      'Authorization': authorization, // passamos o authorization junto com o header
    },
  });
  window.location.reload();
}

buscarPaginas();
buscarUsuarios();

let botaoLogout = document.getElementById('sair');
botaoLogout.addEventListener('click', () => {
  localStorage.removeItem('authorization');
  window.location.href = 'login.html';
});

async function csv() {
  let resposta = await fetch('http://localhost:3000/usuarios/csv')
  download(await resposta.text(), 'text/csv', 'output.csv')
}

//tentar usar essa funcao para o download 
function download(filename, text) {
  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/csv;charset=utf-8,' + encodeURIComponent(text));
  element.setAttribute('download', filename);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}