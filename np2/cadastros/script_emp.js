function salvarDados() {
    var dados = {
        nome: document.getElementById('nome').value,
        tipo: document.getElementById('tipo').value,
        telefone: document.getElementById('telefone').value,
        responsavel: document.getElementById('responsavel').value,
        email: document.getElementById('email').value,
        cep: document.getElementById('cep').value,
        estado: document.getElementById('estado').value,
        cidade: document.getElementById('cidade').value,
        bairro: document.getElementById('bairro').value,
        rua: document.getElementById('rua').value,
        numero: document.getElementById('numero').value,
        complemento: document.getElementById('complemento').value
    };

    adicionarLinhaTabela(dados);
    exibirMensagem('Dados salvos com sucesso!');
    exibirJSON(dados);
    limparDados();
}

function adicionarLinhaTabela(dados) {
    var tabela = document.getElementById('tabelaDados').getElementsByTagName('tbody')[0];
    var novaLinha = tabela.insertRow(tabela.rows.length);
    var endereco = `${dados.rua}, ${dados.numero}, ${dados.complemento}, ${dados.bairro}, ${dados.cidade}, ${dados.estado}`;
    var colunas = ['nome', 'tipo', 'telefone', 'responsavel', 'email', 'endereco'];
    colunas.forEach(function(coluna) {
        var novaCelula = novaLinha.insertCell();
        if (coluna === 'endereco') {
            novaCelula.appendChild(document.createTextNode(endereco));
        } else {
            novaCelula.appendChild(document.createTextNode(dados[coluna]));
        }
    });
}

function exibirMensagem(mensagem) {
    var divMensagem = document.getElementById('mensagem');
    divMensagem.textContent = mensagem;
    divMensagem.style.display = 'block';
}

function exibirJSON(dados) {
    var json = JSON.stringify(dados, null, 2);
    console.log(json); // Exibe o JSON no console do navegador
}

function limparDados() {
    document.getElementById('cadastroForm').reset();
    document.getElementById('mensagem').style.display = 'none';
}

// Função para buscar cidades de acordo com o estado selecionado
function buscarCidades() {
    // Você deve
}