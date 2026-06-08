var database = require("../database/config");

function buscarDadosGraficoLinha(idEmpresa, limite_linhas) {

    var instrucaoSql = 
    `
        SELECT
            emp.id_empresa,
            DATE_FORMAT(dc.data_hora, '%H') AS momento_grafico,
            COUNT(dc.fluxo) AS fluxo
        FROM empresa_parceira emp
        JOIN ponto_monitoramento pt
            ON pt.fk_empresa = emp.id_empresa
        JOIN sensor sn
            ON sn.fk_ponto = pt.id_ponto_monitoramento
        JOIN dado_captado dc
            ON dc.fk_sensor = sn.id_sensor
        WHERE emp.id_empresa = ${idEmpresa}
        GROUP BY
            emp.id_empresa,
            DATE_FORMAT(dc.data_hora, '%H')
        ORDER BY momento_grafico;
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function atualizarDadosGraficoLinha(idEmpresa) {

     var instrucaoSql = 
     `    
        SELECT
            emp.id_empresa,
            DATE_FORMAT(dc.data_hora, '%H') AS momento_grafico,
            COUNT(dc.fluxo) AS fluxo
        FROM empresa_parceira emp
        JOIN ponto_monitoramento pt
            ON pt.fk_empresa = emp.id_empresa
        JOIN sensor sn
            ON sn.fk_ponto = pt.id_ponto_monitoramento
        JOIN dado_captado dc
            ON dc.fk_sensor = sn.id_sensor
        WHERE emp.id_empresa = 1
        GROUP BY
            emp.id_empresa,
            DATE_FORMAT(dc.data_hora, '%H'
        ORDER BY momento_grafico LIMIT 1;
        `;

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

function buscarDadosGraficoLinhaEsp(idpontoMonitoramento, idEmpresa, limite_linhas){
     var instrucaoSql = 
    `SELECT
            emp.id_empresa,
            DATE_FORMAT(dc.data_hora, '%H') AS momento_grafico,
            COUNT(dc.fluxo) AS fluxo
        FROM empresa_parceira emp
        JOIN ponto_monitoramento pt
            ON pt.fk_empresa = emp.id_empresa
        JOIN sensor sn
            ON sn.fk_ponto = pt.id_ponto_monitoramento
        JOIN dado_captado dc
            ON dc.fk_sensor = sn.id_sensor
        WHERE emp.id_empresa = ${idEmpresa} AND 
        pt.id_ponto = ${idpontoMonitoramento}
        GROUP BY
            emp.id_empresa,
            DATE_FORMAT(dc.data_hora, '%H')
        ORDER BY momento_grafico;`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);

}

function atualizarDadosGraficoLinhaEsp(idpontoMonitoramento) {

     var instrucaoSql = 
     `    
        SELECT
            emp.id_empresa,
            DATE_FORMAT(dc.data_hora, '%H') AS momento_grafico,
            COUNT(dc.fluxo) AS fluxo
        FROM empresa_parceira emp
        JOIN ponto_monitoramento pt
            ON pt.fk_empresa = emp.id_empresa
        JOIN sensor sn
            ON sn.fk_ponto = pt.id_ponto_monitoramento
        JOIN dado_captado dc
            ON dc.fk_sensor = sn.id_sensor
        WHERE emp.id_empresa = 1
        GROUP BY
            emp.id_empresa,
            DATE_FORMAT(dc.data_hora, '%H'
        ORDER BY momento_grafico LIMIT 1;
        `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarDadosMapaCalorEsp(limite_linhas, id_grafico) {

    var instrucaoSql = 
    ``;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function atualizarDadosMapaCalorEsp(id_grafico) {

    var instrucaoSql = 
    ``;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    buscarDadosGraficoLinha,
    atualizarDadosGraficoLinha,
    buscarDadosMapaCalor,
    atualizarDadosMapaCalor,
    buscarDadosGraficoLinhaEsp,
    atualizarDadosGraficoLinhaEsp,
    buscarDadosMapaCalorEsp,
    atualizarDadosMapaCalorEsp
}
