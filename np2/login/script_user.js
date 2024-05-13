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

document.getElementById("loginButton").addEventListener("click", function(event){
  event.preventDefault();
  window.location.href = '/np2/inicio/inicio.html';
});

document.getElementById("nome").addEventListener("input", habilitarBotao);
document.getElementById("senha").addEventListener("input", habilitarBotao);