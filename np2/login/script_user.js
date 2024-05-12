document.getElementById('nome').addEventListener('input', function() {
    var nome = document.getElementById('nome').value;
    var senha = document.getElementById('senha').value;
    var loginButton = document.getElementById('loginButton');
    loginButton.disabled = nome === '' || password === '';
  });

  document.getElementById('senha').addEventListener('input', function() {
    var nome = document.getElementById('nome').value;
    var senha = document.getElementById('senha').value;
    var loginButton = document.getElementById('loginButton');
    loginButton.disabled = nome === '' || senha === '';
  });