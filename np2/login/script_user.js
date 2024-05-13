function habilitarBotao() {
  var nome = document.getElementById("nome").value.trim();
  var senha = document.getElementById("senha").value.trim();
  var loginButton = document.getElementById("loginButton");

  if (nome !== "" && senha !== "") {
      loginButton.disabled = false;
  } else {
      loginButton.disabled = true;
  }
}

function fazerLogin(event) {
  event.preventDefault(); // Impede o envio do formulário
  window.location.href = "/np2/inicio/index.html";
}

document.getElementById("nome").addEventListener("input", habilitarBotao);
document.getElementById("senha").addEventListener("input", habilitarBotao);
document.getElementById("loginForm").addEventListener("submit", fazerLogin);