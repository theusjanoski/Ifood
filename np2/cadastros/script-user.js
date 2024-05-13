const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirmPassword');
const saveButton = document.getElementById('saveButton');
const clearButton = document.getElementById('clearButton');
const messageDiv = document.getElementById('message');
const backLink = document.getElementById('backLink');

function validateForm() {
    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();
    const confirmPassword = confirmPasswordInput.value.trim();

    const isUsernameValid = username.length >= 4;
    const isPasswordValid = password.length >= 6;
    const isPasswordConfirmed = password === confirmPassword;

    saveButton.disabled = !(isUsernameValid && isPasswordValid && isPasswordConfirmed);

    if (isUsernameValid && isPasswordValid && !isPasswordConfirmed) {
        showMessage('As senhas não coincidem.');
    } else {
        hideMessage();
    }
}

function showMessage(message) {
    messageDiv.textContent = message;
    messageDiv.style.display = 'block';
}

function hideMessage() {
    messageDiv.textContent = '';
    messageDiv.style.display = 'none';
}

function clearForm() {
    usernameInput.value = '';
    passwordInput.value = '';
    confirmPasswordInput.value = '';
    hideMessage();
    saveButton.disabled = true;
}

saveButton.addEventListener('click', function() {
    showMessage('Cadastro realizado com sucesso!');
});

clearButton.addEventListener('click', clearForm);

usernameInput.addEventListener('input', validateForm);
passwordInput.addEventListener('input', validateForm);
confirmPasswordInput.addEventListener('input', validateForm);

backLink.addEventListener('click', function(event) {
    event.preventDefault();
});
