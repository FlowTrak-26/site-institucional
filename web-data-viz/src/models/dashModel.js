var database = require("../database/config");

function buscarDadosGraficoLinha(limite_linhas, id_grafico) {

    var instrucaoSql = 
    `
        SELECT 
            emp.id_empresa_parceira AS id_empresa,
            emp.franqueadora AS is_franquiadora,
            pt.id_ponto_monitoramento AS id_ponto,
            pt.nome AS nome_ponto,
            pt.fk_empresa,
            an.id_sensor,
            sn.nome AS nome_sensor,
            sn.status AS status_sensor,
            sn.fk_ponto,
            d_cpt.id_dado_captado AS id_dado_cpt,
            d_cpt.data_hora AS momento_grafico,
            d_cpt.fluxo,
            d_cpt.fk_sensor
        FROM empresa_parceira AS emp
            JOIN empresa_parceira AS franq
                ON emp.franqueadora = franq.id_empresa
            JOIN ponto_monitoramento AS pt
                ON pt.fk_empresa = emp.id_empresa
            JOIN sensor AS sn
                ON sn.fk_ponto = pt.id_ponto
            JOIN dado_captado AS d_cpt
                ON d_cpt.fk_sensor = sn.id_sensor
        WHERE id_empresa = 6
        ORDER BY momento_grafico DESC LIMIT 7;
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
