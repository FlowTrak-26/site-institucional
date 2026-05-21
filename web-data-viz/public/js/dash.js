    let proximaAtualizacao;

    window.onload = exibirGraficoLinha(), exibirGraficoCalor();

    function exibirGraficoLinha() {
        var id_grafico = 'linha';
        // dados.forEach(item => {
        //     document.getElementById("btnDados").innerHTML += `
        //     <button class="btn-chart" onclick="exibirDados(${item.id})" id="btnDados${item.id}">${item.descricao}</button>
            document.getElementById("graficos").innerHTML += `
                <div id="grafico-${id_grafico}" class="display-none">
                    <h3 class="tituloGraficos">
                        <span id="tituloGrafico-Linha">Fluxo de pessoas ao longo do dia</span>
                    </h3>
                    <div class="graph">
                        <canvas id="myChartCanvas-${id_grafico}"></canvas>
                    </div>
                    <div class="label-captura">
                        <p id="avisoCaptura${id_grafico}" style="color: white"></p>
                    </div>
                </div>
            `

            obterDadosGrafico(id_grafico)
        ;

        // if (dados.length > 0) {
        //     exibirDados(dados[0].id)
        // }
    }

        function exibirGraficoCalor() {
        var id_grafico = 'calor';
        // dados.forEach(item => {
        //     document.getElementById("btnDados").innerHTML += `
        //     <button class="btn-chart" onclick="exibirDados(${item.id})" id="btnDados${item.id}">${item.descricao}</button>
            document.getElementById("graficos").innerHTML += `
                <div id="grafico${id_grafico}" class="display-none">
                    <h3 class="tituloGraficos">
                        <span id="tituloGrafico-Calor">Mapa de Calor - Fluxo por local</span>
                    </h3>
                    <div class="graph">
                        <canvas id="myChartCanvas-${id_grafico}"></canvas>
                    </div>
                    <div class="label-captura">
                        <p id="avisoCaptura${id_grafico}" style="color: white"></p>
                    </div>
                </div>
            `

            obterDadosGrafico(id_grafico)
        ;

        // if (dados.length > 0) {
        //     exibirDados(dados[0].id)
        // }
    }
    // function alterarTitulo(id) {
    //     var tituloAquario = document.getElementById(`tituloAquario${id}`)
    //     var descricao = JSON.parse(sessionStorage.AQUARIOS).find(item => item.id == id).descricao;
    //     tituloAquario.innerHTML = "Últimas medidas de Temperatura e Umidade do <span style='color: #e6005a'>" + descricao + "</span>"
    // }

    // function exibirDados(id) {
    //     let todosOsGraficos = JSON.parse(sessionStorage.AQUARIOS);

    //     for (i = 0; i < todosOsGraficos.length; i++) {
    //         // exibindo - ou não - o gráfico
    //         if (todosOsGraficos[i].id != id) {
    //             let elementoAtual = document.getElementById(`grafico${todosOsGraficos[i].id}`)
    //             if (elementoAtual.classList.contains("display-block")) {
    //                 elementoAtual.classList.remove("display-block")
    //             }
    //             elementoAtual.classList.add("display-none")

    //             // alterando estilo do botão
    //             let btnAtual = document.getElementById(`btnAquario${todosOsGraficos[i].id}`)
    //             if (btnAtual.classList.contains("btn-pink")) {
    //                 btnAtual.classList.remove("btn-pink")
    //             }
    //             btnAtual.classList.add("btn-white")
    //         }
    //     }

    //     // exibindo - ou não - o gráfico
    //     let graficoExibir = document.getElementById(`grafico${id}`)
    //     graficoExibir.classList.remove("display-none")
    //     graficoExibir.classList.add("display-block")

    //     // alterando estilo do botão
    //     let btnExibir = document.getElementById(`btnAquario${id}`)
    //     btnExibir.classList.remove("btn-white")
    //     btnExibir.classList.add("btn-pink")
    // }

    // O gráfico é construído com três funções:
    // 1. obterDadosGrafico -> Traz dados do Banco de Dados para montar o gráfico da primeira vez
    // 2. plotarGrafico -> Monta o gráfico com os dados trazidos e exibe em tela
    // 3. atualizarGrafico -> Atualiza o gráfico, trazendo novamente dados do Banco

    // Esta função *obterDadosGrafico* busca os últimos dados inseridos em tabela de medidas.
    // para, quando carregar o gráfico da primeira vez, já trazer com vários dados.
    // A função *obterDadosGrafico* também invoca a função *plotarGrafico*

    //     Se quiser alterar a busca, ajuste as regras de negócio em src/controllers
    //     Para ajustar o "select", ajuste o comando sql em src/models
    function obterDadosGrafico(id_grafico) {

        if (proximaAtualizacao != undefined) {
            clearTimeout(proximaAtualizacao);
        }

        fetch(`/dash/ultimas/grafico-${id_grafico}`, { cache: 'no-store' }).then(function (response) {
            if (response.ok) {
                response.json().then(function (resposta) {
                    console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
                    resposta.reverse();

                    plotarGrafico(resposta, id_grafico);

                });
            } else {
                console.error('Nenhum dado encontrado ou erro na API');
            }
        })
            .catch(function (error) {
                console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
            });
    }

    // Esta função *plotarGrafico* usa os dados capturados na função anterior para criar o gráfico
    // Configura o gráfico (cores, tipo, etc), materializa-o na página e, 
    // A função *plotarGrafico* também invoca a função *atualizarGrafico*
    function plotarGrafico(resposta, id_grafico) {

        console.log('iniciando plotagem do gráfico...');

        // Criando estrutura para plotar gráfico - labels
        let labels = [];

        // Criando estrutura para plotar gráfico - dados
        let dados = {
            labels: labels,
            datasets: [{
                label: 'Umidade',
                data: [],
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1
            }]
        };

        console.log('----------------------------------------------')
        console.log('Estes dados foram recebidos pela funcao "obterDadosGrafico" e passados para "plotarGrafico":')
        console.log(resposta)

        // Inserindo valores recebidos em estrutura para plotar o gráfico
        for (i = 0; i < resposta.length; i++) {
            var registro = resposta[i];
            labels.push(registro.momento_grafico);
            dados.datasets[0].data.push(registro.umidade);
        }

        console.log('----------------------------------------------')
        console.log('O gráfico será plotado com os respectivos valores:')
        console.log('Labels:')
        console.log(labels)
        console.log('Dados:')
        console.log(dados.datasets)
        console.log('----------------------------------------------')

        // Criando estrutura para plotar gráfico - config
        const config = {
            type: 'line',
            data: dados,
        };

        // Adicionando gráfico criado em div na tela
        let myChart = new Chart(
            document.getElementById(`myChartCanvas-${id_grafico}`),
            config
        );

        setTimeout(() => atualizarGrafico(id_, dados, myChart), 2000);
    }


    // Esta função *atualizarGrafico* atualiza o gráfico que foi renderizado na página,
    // buscando a última medida inserida em tabela contendo as capturas, 

    //     Se quiser alterar a busca, ajuste as regras de negócio em src/controllers
    //     Para ajustar o "select", ajuste o comando sql em src/models
    function atualizarGrafico(id_grafico, dados, myChart) {



        fetch(`/dash/tempo-real/grafico-${id_grafico}`, { cache: 'no-store' }).then(function (response) {
            if (response.ok) {
                response.json().then(function (novoRegistro) {

                    obterdados(id_grafico);
                    // alertar(novoRegistro, id);
                    console.log(`Dados recebidos: ${JSON.stringify(novoRegistro)}`);
                    console.log(`Dados atuais do gráfico:`);
                    console.log(dados);

                    let avisoCaptura = document.getElementById(`avisoCaptura${id}`)
                    avisoCaptura.innerHTML = ""


                    if (novoRegistro[0].momento_grafico == dados.labels[dados.labels.length - 1]) {
                        console.log("---------------------------------------------------------------")
                        console.log("Como não há dados novos para captura, o gráfico não atualizará.")
                        avisoCaptura.innerHTML = "<i class='fa-solid fa-triangle-exclamation'></i> Foi trazido o dado mais atual capturado pelo sensor. <br> Como não há dados novos a exibir, o gráfico não atualizará."
                        console.log("Horário do novo dado capturado:")
                        console.log(novoRegistro[0].momento_grafico)
                        console.log("Horário do último dado capturado:")
                        console.log(dados.labels[dados.labels.length - 1])
                        console.log("---------------------------------------------------------------")
                    } else {
                        // tirando e colocando valores no gráfico
                        dados.labels.shift(); // apagar o primeiro
                        dados.labels.push(novoRegistro[0].momento_grafico); // incluir um novo momento

                        dados.datasets[0].data.shift();  // apagar o primeiro de umidade
                        dados.datasets[0].data.push(novoRegistro[0].umidade); // incluir uma nova medida de umidade

                        myChart.update();
                    }

                    // Altere aqui o valor em ms se quiser que o gráfico atualize mais rápido ou mais devagar
                    proximaAtualizacao = setTimeout(() => atualizarGrafico(id_grafico, dados, myChart), 2000);
                });
            } else {
                console.error('Nenhum dado encontrado ou erro na API');
                // Altere aqui o valor em ms se quiser que o gráfico atualize mais rápido ou mais devagar
                proximaAtualizacao = setTimeout(() => atualizarGrafico(id_grafico, dados, myChart), 2000);
            }
        })
            .catch(function (error) {
                console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
            });

    }