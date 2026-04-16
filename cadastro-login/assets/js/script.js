// login

let listas_user = [
    'Caio@flowtrak.com',
    'Emanuelly@flowtrak.com',
    'Vitor@flowtrak.com',
    'Victor@flowtrak.com',
    'Karina@flowtrak.com',
    'Isaac@flowtrak.com'
];
let listas_senha = ['caio1234', 'ema1234', 'vitor1234', 'victor1234', 'karina1234', 'isaac1234'];
let contador_tentativas = 3;

function logar() {
    // entradas
    let nome_login = (ipt_email_login.value);
    let senha_login = (ipt_senha_login.value);
    // reset tentativas texto
    erro_tentativas.innerHTML = ``;
    login_sucesso.innerHTML = ``;

    // contador de comparação 
    let contador_user = 0;

    // verificação de preenchimento dos campos
    if (nome_login != "" && senha_login != "") {
        // verifica se o usuario ainda tem tentativas
        if (contador_tentativas > 0) {
            // verifica se o user_name que o usuario colocou no input está na lista de usuarios
            if (listas_user.includes(nome_login)) {
                // procura em qual vetor da lista esse usuario está, para simular um BD com IDs, sendo 
                // o user e a senha no mesmo campo das listas (listas_user) e (listas_senhas)
                // para ele verificar nesse mesmo vetor na outra lista
                for (let i = 0; i < listas_user.length; i++) {
                    if (nome_login == listas_user[i]) {
                        contador_user = i; // atribui o número do vetor a uma variavel para comparar depois 
                    }
                }

                if (senha_login == listas_senha[contador_user]) { // usa essa variavel
                    login_sucesso.innerHTML = `sucesso`; // modal sucesso
                } else {
                    contador_tentativas --; 
                    alert("Sua senha está incorreta");
                }

            } else {
                alert("Este usuário não existe!")
            }
        } else {
            erro_tentativas.innerHTML = `erro`; // modal_error
        }
    } else {
        alert("Preencha os campos corretamente!")
    }
}