// Esta função salva os dados inseridos no formulário em um objeto JavaScript,
// adiciona uma nova linha à tabela com esses dados e exibe o objeto em formato JSON no console do navegador. 
// Em seguida, limpa o formulário.
function salvarDados() {
    // Obtém os valores dos campos do formulário e armazena em um objeto 'dados'.
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

    // Adiciona uma nova linha à tabela com os dados inseridos.
    adicionarLinhaTabela(dados);
    // Exibe os dados em formato JSON no console do navegador.
    exibirJSON(dados);
    // Limpa os campos do formulário.
    limparDados();
}

// Esta função adiciona uma nova linha à tabela com os dados fornecidos.
function adicionarLinhaTabela(dados) {
    // Obtém a referência da tabela e sua área de corpo.
    var tabela = document.getElementById('tabelaDados').getElementsByTagName('tbody')[0];
    // Insere uma nova linha na tabela.
    var novaLinha = tabela.insertRow(tabela.rows.length);
    // Monta o endereço a partir dos dados fornecidos.
    var endereco = `${dados.rua}, ${dados.numero}, ${dados.complemento}, ${dados.bairro}, ${dados.cidade}, ${dados.uf}`;
    // Define as colunas da tabela que serão preenchidas com os dados.
    var colunas = ['nome', 'ramo', 'email', 'cnpj', 'endereco'];
    // Itera sobre as colunas, criando células na nova linha e preenchendo com os dados correspondentes.
    colunas.forEach(function(coluna) {
        var novaCelula = novaLinha.insertCell();
        if (coluna === 'endereco') {
            novaCelula.appendChild(document.createTextNode(endereco));
        } else {
            novaCelula.appendChild(document.createTextNode(dados[coluna]));
        }
    });
}

// Esta função exibe os dados em formato JSON no console do navegador.
function exibirJSON(dados) {
    var json = JSON.stringify(dados, null, 2);
    console.log(json); // Exibe o JSON no console do navegador
}

// Esta função limpa os campos do formulário e oculta a mensagem de sucesso.
function limparDados() {
    document.getElementById('cadastroForm').reset();
    document.getElementById('mensagem').style.display = 'none';
}

// Seleciona os elementos de seleção de UF e cidade.
const ufSelect = document.getElementById('ufSelect');
const cidadeSelect = document.getElementById('cidadeSelect');

// Esta função assíncrona carrega as UFs do Brasil a partir de uma API.
async function carregarUFs() {
    // Realiza uma solicitação assíncrona para obter as UFs da API do IBGE.
    const response = await fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados');
    // Converte a resposta para JSON.
    const ufs = await response.json();
    // Itera sobre as UFs e cria uma opção para cada uma delas no elemento de seleção de UF.
    ufs.forEach(uf => {
        const option = document.createElement('option');
        option.text = uf.nome;
        option.value = uf.sigla;
        ufSelect.add(option);
    });
}

// Esta função assíncrona busca as cidades de uma UF selecionada a partir de uma API.
async function buscarCidades() {
    // Obtém a sigla da UF selecionada.
    const ufSigla = ufSelect.value;
    // Limpa as opções existentes no elemento de seleção de cidade e exibe uma mensagem de carregamento.
    cidadeSelect.innerHTML = '<option value="">Carregando...</option>';

    // Verifica se uma UF foi selecionada.
    if (ufSigla !== '') {
        // Realiza uma solicitação assíncrona para obter as cidades da UF selecionada da API do IBGE.
        const response = await fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufSigla}/municipios`);
        // Converte a resposta para JSON.
        const cidades = await response.json();
        // Limpa a mensagem de carregamento e adiciona uma opção padrão no elemento de seleção de cidade.
        cidadeSelect.innerHTML = '<option value="">Selecione uma cidade</option>';
        // Itera sobre as cidades e cria uma opção para cada uma delas no elemento de seleção de cidade.
        cidades.forEach(cidade => {
            const option = document.createElement('option');
            option.text = cidade.nome;
            cidadeSelect.add(option);
        });
    } else {
        // Se nenhuma UF for selecionada, exibe uma mensagem solicitando que uma UF seja selecionada primeiro.
        cidadeSelect.innerHTML = '<option value="">Selecione uma UF primeiro</option>';
    }
}

// Chama a função para carregar as UFs assim que a página é carregada.
carregarUFs();

// Esta função preenche automaticamente o bairro e a rua ao inserir o CEP.
async function preencherEndereco() {
    // Obtém o valor do CEP inserido pelo usuário.
    const cep = document.getElementById('cep').value;
    // Verifica se o CEP possui 8 dígitos e se são caracteres numéricos.
    if (cep.length === 8 && !isNaN(cep)) {
        // Realiza uma solicitação assíncrona para obter os dados do endereço a partir do CEP informado.
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        // Converte a resposta para JSON.
        const endereco = await response.json();
        // Verifica se o CEP é válido e preenche os campos de bairro e rua com os dados obtidos.
        if (!endereco.erro) {
            document.getElementById('bairro').value = endereco.bairro;
            document.getElementById('rua').value = endereco.logradouro;
        } else {
            // Se o CEP não for encontrado, exibe um alerta solicitando um CEP válido.
            alert('CEP não encontrado. Por favor, insira um CEP válido.');
        }
    }
}

// Adiciona um ouvinte de evento ao campo de entrada de CEP para acionar a função preencherEndereco().
document.getElementById('cep').addEventListener('input', preencherEndereco);
