var database = require("../database/config");

function buscarDadosGraficoLinha(idEmpresa, limite_linhas) {

    var instrucaoSql = 
    `
        SELECT
            emp.id_empresa,
            pt.nome AS nome_ponto,
            sn.id_sensor AS nome_sensor,
            data_hora, dc.fluxo
            FROM empresa_parceira emp
            JOIN ponto_monitoramento pt
            ON pt.fk_empresa = emp.id_empresa
            JOIN sensor sn
            ON sn.fk_ponto = pt.id_ponto
            JOIN dado_captado dc
            ON dc.fk_sensor = sn.id_sensor
            WHERE emp.id_empresa = ${idEmpresa}
            ORDER BY dc.data_hora DESC
            LIMIT 7;
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function atualizarDadosGraficoLinha(id_grafico) {

     var instrucaoSql = 
     ``;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarDadosMapaCalor(limite_linhas, id_grafico) {

    var instrucaoSql = 
    ``;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function atualizarDadosMapaCalor(id_grafico) {

    var instrucaoSql = 
    ``;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    buscarDadosGraficoLinha,
    atualizarDadosGraficoLinha,
    buscarDadosMapaCalor,
    atualizarDadosMapaCalor
}
