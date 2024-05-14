const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirmPassword');
const saveButton = document.getElementById('saveButton');
const clearButton = document.getElementById('clearButton');
const messageDiv = document.getElementById('message');

// Esta função valida o formulário, verificando se o nome de usuário é válido,
// se a senha tem pelo menos 6 caracteres e se a senha e a confirmação de senha coincidem.
function validateForm() {
    const username = usernameInput.value.trim(); // Obtém e remove espaços em branco do valor do campo de nome de usuário.
    const password = passwordInput.value.trim(); // Obtém e remove espaços em branco do valor do campo de senha.
    const confirmPassword = confirmPasswordInput.value.trim(); // Obtém e remove espaços em branco do valor do campo de confirmação de senha.

    // Verifica se o nome de usuário tem pelo menos 4 caracteres.
    const isUsernameValid = username.length >= 4;
    // Verifica se a senha tem pelo menos 6 caracteres.
    const isPasswordValid = password.length >= 6;
    // Verifica se a senha e a confirmação de senha são iguais.
    const isPasswordConfirmed = password === confirmPassword;

    // Desabilita o botão de salvar se alguma das condições não for atendida.
    saveButton.disabled = !(isUsernameValid && isPasswordValid && isPasswordConfirmed);

    // Se o nome de usuário for válido, a senha for válida e as senhas não coincidirem,
    // exibe uma mensagem de erro, caso contrário, oculta a mensagem.
    if (isUsernameValid && isPasswordValid && !isPasswordConfirmed) {
        showMessage('As senhas não coincidem.');
    } else {
        hideMessage();
    }
}

// Esta função exibe uma mensagem na div de mensagem.
function showMessage(message) {
    messageDiv.textContent = message; // Define o texto da mensagem.
    messageDiv.style.display = 'block'; // Exibe a div de mensagem alterando seu estilo para "block".
}

// Esta função oculta a div de mensagem.
function hideMessage() {
    messageDiv.textContent = ''; // Limpa o texto da mensagem.
    messageDiv.style.display = 'none'; // Oculta a div de mensagem alterando seu estilo para "none".
}
// Adiciona evento ao botão de salvar que exibe uma mensagem de sucesso quando clicado.
saveButton.addEventListener('click', function() {
    showMessage('Cadastro realizado com sucesso!');
});

// Esta função limpa o formulário, redefinindo os valores dos campos e ocultando a mensagem de erro.
function clearForm() {
    usernameInput.value = ''; // Limpa o campo de nome de usuário.
    passwordInput.value = ''; // Limpa o campo de senha.
    confirmPasswordInput.value = ''; // Limpa o campo de confirmação de senha.
    hideMessage(); // Oculta a mensagem de erro.
    saveButton.disabled = true; // Desabilita o botão de salvar.
}


// Adiciona evento ao botão de limpar que chama a função clearForm quando clicado.
clearButton.addEventListener('click', clearForm);

// Adiciona evento aos campos de entrada (nome de usuário, senha e confirmação de senha)
// que chamam a função validateForm sempre que houver uma entrada de texto.
usernameInput.addEventListener('input', validateForm);
passwordInput.addEventListener('input', validateForm);
confirmPasswordInput.addEventListener('input', validateForm);