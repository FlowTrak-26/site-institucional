// sessão
function validarSessao() {

    var email = sessionStorage.EMAIL_USUARIO;
    var nome = sessionStorage.NOME_USUARIO;
    var permissao = sessionStorage.PERMISSAO; // validar se é admin se for ele pode ter acesso a pg perfil empresa

    // user_name.innerHTML = sessionStorage.NOME_USUARIO;
    // user_permissao.innerHTML = sessionStorage.PERMISSAO;


    // var b_usuario = document.getElementById("b_usuario");
    var user_name = document.getElementById('user_name');
    var user_permissao = document.getElementById('user_permissao');

    // if (email != null && nome != null) {
    //     user_name.innerHTML = nome;
    //     user_permissao.innerHTML = permissao;
    // } else {
    //     window.location = "../login.html";
    // }
}

function limparSessao() {
    sessionStorage.clear();
    // window.location = "./main/login.html";
}

// carregamento (loading)
function aguardar() {
    var divAguardar = document.getElementById("div_aguardar");
    divAguardar.style.display = "flex";
}

function finalizarAguardar(texto) {
    var divAguardar = document.getElementById("div_aguardar");
    divAguardar.style.display = "none";

    var divErrosLogin = document.getElementById("div_erros_login");
    if (texto) {
        divErrosLogin.style.display = "flex";
        // divErrosLogin.style.position = "absolute";
        divErrosLogin.innerHTML = `<p id="mensagem_erro_login">${texto}</p>`;
    }
}
