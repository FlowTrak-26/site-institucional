let proximaAtualizacao;

window.onload = exibirGraficoLinha(), exibirGraficoCalor();

function exibirGraficoLinha() {
    var idEmpresa = 'linha';
    // dados.forEach(item => {
    //     document.getElementById("btnDados").innerHTML += `
    //     <button class="btn-chart" onclick="exibirDados(${item.id})" id="btnDados${item.id}">${item.descricao}</button>
    document.getElementById("graficos").innerHTML += `
                <div id="grafico-${idEmpresa}" class="display-none">
                    <h3 class="tituloGraficos">
                        <span id="tituloGrafico-Linha">Fluxo de pessoas ao longo do dia</span>
                    </h3>
                    <div class="graph">
                        <canvas id="myChartCanvas-${idEmpresa}"></canvas>
                    </div>
                    <div class="label-captura">
                        <p id="avisoCaptura${idEmpresa}" style="color: white"></p>
                    </div>
                </div>
            `

    obterDadosGrafico(idEmpresa)
        ;

    // if (dados.length > 0) {
    //     exibirDados(dados[0].id)
    // }
}

function exibirGraficoCalor() {
    var idEmpresa = 'calor';
    // dados.forEach(item => {
    //     document.getElementById("btnDados").innerHTML += `
    //     <button class="btn-chart" onclick="exibirDados(${item.id})" id="btnDados${item.id}">${item.descricao}</button>
    document.getElementById("graficos").innerHTML += `
                <div id="grafico${idEmpresa}" class="display-none">
                    <h3 class="tituloGraficos">
                        <span id="tituloGrafico-Calor">Mapa de Calor - Fluxo por local</span>
                    </h3>
                    <div class="graph">
                        <canvas id="myChartCanvas-${idEmpresa}"></canvas>
                    </div>
                    <div class="label-captura">
                        <p id="avisoCaptura${idEmpresa}" style="color: white"></p>
                    </div>
                </div>
            `

    obterDadosGrafico(idEmpresa)
        ;

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

}