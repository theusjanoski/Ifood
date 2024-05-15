// Esta função habilita ou desabilita o botão de login com base nos valores dos campos de nome e senha.
function habilitarBotao() {
  // Obtém os valores dos campos de nome e senha e remove os espaços em branco no início e no final.
  var nome = document.getElementById("nome").value.trim();
  var senha = document.getElementById("senha").value.trim();
  var loginButton = document.getElementById("loginButton");

  // Verifica se ambos os campos estão preenchidos.
  if (nome !== "" && senha !== "") {
      // Se ambos os campos estiverem preenchidos, habilita o botão de login.
      loginButton.disabled = false;
  } else {
      // Se algum dos campos estiver vazio, desabilita o botão de login.
      loginButton.disabled = true;
  }
}

// Adiciona evento de entrada ao campo de nome, chamando a função habilitarBotao() sempre que o valor do campo mudar.
document.getElementById("nome").addEventListener("input", habilitarBotao);

// Adiciona evento de entrada ao campo de senha, chamando a função habilitarBotao() sempre que o valor do campo mudar.
document.getElementById("senha").addEventListener("input", habilitarBotao);
