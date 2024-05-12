function habilitarBotao() {
  var nome = document.getElementById("nome");
  var senha = document.getElementById("senha");
  var loginButton = document.getElementById("loginButton");

  if (nome.value.trim() !== "" && senha.value.trim() !== "") {
    loginButton.disabled = false;
  } else {
    loginButton.disabled = true;
  }
}
