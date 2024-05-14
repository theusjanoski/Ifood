function salvarDados() {
    var dados = {
        nome: document.getElementById('nome').value,
        ramo: document.getElementById('ramo').value,
        email: document.getElementById('email').value,
        senha: document.getElementById('senha').value,
        cnpj: document.getElementById('cnpj').value,
        cep: document.getElementById('cep').value,
        uf: document.getElementById('ufSelect').value,
        cidade: document.getElementById('cidadeSelect').value,
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
    var endereco = `${dados.rua}, ${dados.numero}, ${dados.complemento}, ${dados.bairro}, ${dados.cidade}, ${dados.uf}`;
    var colunas = ['nome', 'ramo', 'email', 'cnpj', 'endereco'];
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

const ufSelect = document.getElementById('ufSelect');
const cidadeSelect = document.getElementById('cidadeSelect');

// Função para carregar as UFs
async function carregarUFs() {
    const response = await fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados');
    const ufs = await response.json();
    ufs.forEach(uf => {
        const option = document.createElement('option');
        option.text = uf.nome;
        option.value = uf.sigla;
        ufSelect.add(option);
    });
}

// Função para buscar as cidades de uma UF selecionada
async function buscarCidades() {
    const ufSigla = ufSelect.value;
    cidadeSelect.innerHTML = '<option value="">Carregando...</option>';

    if (ufSigla !== '') {
        const response = await fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufSigla}/municipios`);
        const cidades = await response.json();
        cidadeSelect.innerHTML = '<option value="">Selecione uma cidade</option>';
        cidades.forEach(cidade => {
            const option = document.createElement('option');
            option.text = cidade.nome;
            cidadeSelect.add(option);
        });
    } else {
        cidadeSelect.innerHTML = '<option value="">Selecione uma UF primeiro</option>';
    }
}

// Carregar as UFs quando a página carregar
carregarUFs();

// Função para preencher automaticamente bairro e rua ao inserir o CEP
async function preencherEndereco() {
    const cep = document.getElementById('cep').value;
    if (cep.length === 8 && !isNaN(cep)) {
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const endereco = await response.json();
        if (!endereco.erro) {
            document.getElementById('bairro').value = endereco.bairro;
            document.getElementById('rua').value = endereco.logradouro;
        } else {
            alert('CEP não encontrado. Por favor, insira um CEP válido.');
        }
    }
}

// Adicionando evento de input ao campo CEP
document.getElementById('cep').addEventListener('input', preencherEndereco);
