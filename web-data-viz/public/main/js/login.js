// login lógica

// Dados Mockados

// lista de usuarios
let listas_user = [
    'Caio@flowtrak.com',
    'Emanuelly@flowtrak.com',
    'Vitor@flowtrak.com',
    'Victor@flowtrak.com',
    'Karina@flowtrak.com',
    'Isaac@flowtrak.com'
];

// lista de senhas
let listas_senha = [
    'caio1234',
    'ema1234',
    'vitor1234',
    'victor1234',
    'karina1234',
    'isaac1234'
];

// tentativas de login
let contador_tentativas = 3;

function logar() {
    // entradas
    let nome_login = (ipt_email_login.value);
    let senha_login = (ipt_senha_login.value);
    let erro_cadastro = false;
    let sucesso_cadastro = false;

    // elementos HTML
    let content_erro = document.querySelector('.container-aviso');
    let content_sucesso = document.querySelector('.container-sucesso');

    // reset texto erro/sucesso
    erro_status.innerHTML = ``;
    login_sucesso.innerHTML = ``;

    // contador de comparação 
    let contador_user = 0;

    // verificação de preenchimento dos campos
    if (nome_login != "" && senha_login != "") {
        // verifica se o usuario ainda tem tentativas
        if (contador_tentativas > 0) {
            // verifica se o user_name que o usuario colocou no input está na lista de usuarios
            if (listas_user.includes(nome_login)) {
                // procura em qual vetor da lista esse usuario está, para simular um BD com IDs, sendo o user e a senha no mesmo campo das listas (listas_user) e (listas_senhas) para ele verificar nesse mesmo vetor na outra lista

                for (let i = 0; i < listas_user.length; i++) {
                    if (nome_login == listas_user[i]) {
                        contador_user = i; // atribui o número do vetor a uma variavel para comparar depois 
                    }
                }

                if (senha_login == listas_senha[contador_user]) { // usa essa variavel
                    // content do login sucesso
                    content_sucesso.style.display = 'flex';
                    login_sucesso.innerHTML = `Seu login foi um sucesso! Estamos te redirecionando.`;
                    sucesso_cadastro = true;

                } else {
                    contador_tentativas--; // diminui a variavel que conta as tentativas
                    if (contador_tentativas >= 1) { // se ele tem 1 tentativa ou mais aparece essa mensagem 
                        // content do erro login
                        content_erro.style.display = 'flex';
                        erro_status.innerHTML = `Sua senha está incorreta! Você ainda tem ${contador_tentativas} tentativas.`;
                        erro_cadastro = true;
                    } else { // se não tem mais tentativas
                        content_erro.style.display = 'flex';
                        erro_status.innerHTML = 
                            `
                                Sua senha está incorreta!<br>
                                Você não tem mais tentativas.
                            `;
                        erro_cadastro = true;
                    }
                }

            } else {
                content_erro.style.display = 'flex';
                erro_status.innerHTML = `Este usuário não existe!`; // usuario não existe
                erro_cadastro = true;
            }
        } else if (contador_tentativas <= 0) {
            content_erro.style.display = 'flex';
            erro_status.innerHTML = `Tentativas esgotadas`; // modal_error limite de tentativas esgotado
            erro_cadastro = true;
        }
    } else {
        content_erro.style.display = 'flex';
        erro_status.innerHTML = `Preencha os campos corretamente`; // não preencheu os campos corretamente
        erro_cadastro = true;
    }
}

// fechar modais de aviso
let content_erro = document.querySelector('.container-aviso');
let content_sucesso = document.querySelector('.container-sucesso')
let btn_fechar_sucesso = document.getElementById('btn_fechar_sucesso');
let btn_fechar_aviso = document.getElementById('btn_fechar_aviso');

btn_fechar_aviso.addEventListener('click', () => {
    content_erro.style.display = 'none';
})

btn_fechar_sucesso.addEventListener('click', () => {
    content_sucesso.style.display = 'none';
    location.reload();
})