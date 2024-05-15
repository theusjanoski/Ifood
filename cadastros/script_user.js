const campoNomeUsuario = document.getElementById('username');
const campoSenha = document.getElementById('password');
const campoConfirmarSenha = document.getElementById('confirmPassword');
const botaoSalvar = document.getElementById('saveButton');
const botaoLimpar = document.getElementById('clearButton');
const divMensagem = document.getElementById('message');

// Esta função valida o formulário, verificando se o nome de usuário é válido,
// se a senha tem pelo menos 6 caracteres e se a senha e a confirmação de senha coincidem.
function validarFormulario() {
    const nomeUsuario = campoNomeUsuario.value.trim(); // Obtém e remove espaços em branco do valor do campo de nome de usuário.
    const senha = campoSenha.value.trim(); // Obtém e remove espaços em branco do valor do campo de senha.
    const confirmarSenha = campoConfirmarSenha.value.trim(); // Obtém e remove espaços em branco do valor do campo de confirmação de senha.

    // Verifica se o nome de usuário tem pelo menos 4 caracteres.
    const nomeUsuarioValido = nomeUsuario.length >= 4;
    // Verifica se a senha tem pelo menos 6 caracteres.
    const senhaValida = senha.length >= 6;
    // Verifica se a senha e a confirmação de senha são iguais.
    const senhaConfirmada = senha === confirmarSenha;

    // Desabilita o botão de salvar se alguma das condições não for atendida.
    botaoSalvar.disabled = !(nomeUsuarioValido && senhaValida && senhaConfirmada);

    // Se o nome de usuário for válido, a senha for válida e as senhas não coincidirem,
    // exibe uma mensagem de erro, caso contrário, oculta a mensagem.
    if (nomeUsuarioValido && senhaValida && !senhaConfirmada) {
        exibirMensagem('As senhas não coincidem.');
    } else {
        ocultarMensagem();
    }
}

// Esta função exibe uma mensagem na div de mensagem.
function exibirMensagem(mensagem) {
    divMensagem.textContent = mensagem; // Define o texto da mensagem.
    divMensagem.style.display = 'block'; // Exibe a div de mensagem alterando seu estilo para "block".
}

// Esta função oculta a div de mensagem.
function ocultarMensagem() {
    divMensagem.textContent = ''; // Limpa o texto da mensagem.
    divMensagem.style.display = 'none'; // Oculta a div de mensagem alterando seu estilo para "none".
}

// Adiciona evento ao botão de salvar que exibe uma mensagem de sucesso quando clicado.
botaoSalvar.addEventListener('click', function() {
    exibirMensagem('Cadastro realizado com sucesso!');
});

// Esta função limpa o formulário, redefinindo os valores dos campos e ocultando a mensagem de erro.
function limparFormulario() {
    campoNomeUsuario.value = ''; // Limpa o campo de nome de usuário.
    campoSenha.value = ''; // Limpa o campo de senha.
    campoConfirmarSenha.value = ''; // Limpa o campo de confirmação de senha.
    ocultarMensagem(); // Oculta a mensagem de erro.
    botaoSalvar.disabled = true; // Desabilita o botão de salvar.
}

// Adiciona evento ao botão de limpar que chama a função limparFormulario quando clicado.
botaoLimpar.addEventListener('click', limparFormulario);

// Adiciona evento aos campos de entrada (nome de usuário, senha e confirmação de senha)
// que chamam a função validarFormulario sempre que houver uma entrada de texto.
campoNomeUsuario.addEventListener('input', validarFormulario);
campoSenha.addEventListener('input', validarFormulario);
campoConfirmarSenha.addEventListener('input', validarFormulario);