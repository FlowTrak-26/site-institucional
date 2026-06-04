


function iniciarpagina() {
    const nomeUsuario = document.getElementById('nomeUsuario');
    const nome = sessionStorage.NOME_USUARIO || '';
    if (nomeUsuario) {
        nomeUsuario.textContent = nome;
    }
}

function carregarFiliaisNaTela() {
    fetch("/empresas/listar", { cache: 'no-store' })
    .then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {
                console.log("dados dos supermercados recebidos !", resposta);
                
                var listaContainer = document.getElementById("filiais_list");
                listaContainer.innerHTML = ""; // Limpa os dados estáticos

                // uptada o contador de filiais do banner la em cima com o número real do banco
                if (resposta.length > 0) {
                    document.querySelector(".stats-box .count").innerHTML = resposta.length;
                }

                // procura a resposta mapeando as colunas bd
                for (let i = 0; i < resposta.length; i++) {
                    var empresaAtual = resposta[i];

                    listaContainer.innerHTML += `
                        <div class="filial-card">
                            <p class="filial-desc">
                                <span class="filial-title">${empresaAtual.nome}</span>,
                                Endereço Sede: ${empresaAtual.endereco_sede}
                            </p>
                            <div class="filial-actions">
                                <span class="status-badge ativa">ATIVA</span>
                                <button class="btn-enter" onclick="sessionStorage.ID_EMPRESA_ATUAL = ${empresaAtual.id_empresa}; window.location='./dashboard-espc.html'">
                                    <i class="fa-solid fa-right-to-bracket"></i>
                                </button>
                            </div>
                        </div>
                    `;
                }

                // Mantém a div vazia estilizar 
                listaContainer.innerHTML += `<div class="filial-card empty"></div>`;
            });
        } else {
            console.error("Erro na resposta da API.");
        }
    }).catch(function (erro) {
        console.error("Erro ao fazer o fetch das empresas:", erro);
    });
}

       