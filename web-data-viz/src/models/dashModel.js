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

function buscarDadosMapaCalor(idEmpresa) {

    var instrucaoSql = 
    `
        SELECT
            emp.id_empresa,
            DATE_FORMAT(dc.data_hora, '%H') AS momento_grafico,
            COUNT(dc.fluxo) AS fluxo,
            id_ponto_monitoramento
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
            DATE_FORMAT(dc.data_hora, '%H'),
            id_ponto_monitoramento
        ORDER BY momento_grafico;
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function atualizarDadosMapaCalor(id_grafico) {

    var instrucaoSql = 
    ``;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


function buscarKpiTotal(idEmpresa) {
    var instrucaoSql = `
        SELECT SUM(dc.fluxo) AS total_passagens
        FROM ponto_monitoramento pm
        JOIN sensor s ON s.fk_ponto = pm.id_ponto_monitoramento
        JOIN dado_captado dc ON dc.fk_sensor = s.id_sensor
        WHERE pm.fk_empresa = ${idEmpresa};
    `;
    console.log("Executando a instrução SQL (KPI Total): \n" + instrucaoSql);
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

// function buscarKpiTotal(idEmpresa) { //kpi 1 total
//     //  todo o fluxo da empresa selecionada
//     var instrucaoSql = `
//         SELECT SUM(fluxo) as total_passagens
//         FROM dashGraficosLinha
//         WHERE id_empresa = ${idEmpresa};
//     `;
//     console.log("Executando a instrução SQL: \n" + instrucaoSql);
//     return database.executar(instrucaoSql);
// }

function buscarKpiSetorPico(idEmpresa) {
    // Agrupa pelo nome do ponto e ordena do maior para o menor, pegando apenas o Top 1
    var instrucaoSql = `
        SELECT nome_ponto AS setor, SUM(fluxo) AS total
        FROM dashGraficosLinha
        WHERE id_empresa = ${idEmpresa}
        GROUP BY nome_ponto
        ORDER BY total DESC
        LIMIT 1;
    `;
    console.log("Executando a instrução SQL (KPI Setor Pico): \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarKpiHorarioPico(idEmpresa) {
    // apenas a HORA da data_hora, soma os fluxos e ordena para pegar a hora mais MANEIRA!!!!!!
    var instrucaoSql = `
        SELECT 
            HOUR(dc.data_hora) AS hora_pico, 
            SUM(dc.fluxo) AS total_passagens
        FROM ponto_monitoramento pm
        JOIN sensor s ON s.fk_ponto = pm.id_ponto_monitoramento
        JOIN dado_captado dc ON dc.fk_sensor = s.id_sensor
        WHERE pm.fk_empresa = ${idEmpresa}
        GROUP BY HOUR(dc.data_hora)
        ORDER BY total_passagens DESC
        LIMIT 1;
    `;
    
    console.log("Executando a instrução SQL (KPI Horário Pico): \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarKpiLocalMaisAcessado(idEmpresa) {
    var instrucaoSql = `
        SELECT 
            pm.nome AS setor, 
            SUM(dc.fluxo) AS total_setor,
            ROUND((SUM(dc.fluxo) / (
                SELECT SUM(dc2.fluxo)
                FROM dado_captado dc2
                JOIN sensor s2 ON dc2.fk_sensor = s2.id_sensor
                JOIN ponto_monitoramento pm2 ON s2.fk_ponto = pm2.id_ponto_monitoramento
                WHERE pm2.fk_empresa = ${idEmpresa}
            )) * 100, 1) AS porcentagem
        FROM ponto_monitoramento pm
        JOIN sensor s ON s.fk_ponto = pm.id_ponto_monitoramento
        JOIN dado_captado dc ON dc.fk_sensor = s.id_sensor
        WHERE pm.fk_empresa = ${idEmpresa}
        GROUP BY pm.nome
        ORDER BY total_setor DESC
        LIMIT 1;
    `;
    console.log("Executando a instrução SQL (KPI Local Mais Acessado): \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarKpiFluxoIntenso(idEmpresa) {
    // grupa tanto pelo setor quanto pela hora para achar o ponto exato de maior superHIPERMEGAlotação
    var instrucaoSql = `
        SELECT 
            pm.nome AS setor, 
            HOUR(dc.data_hora) AS hora_pico, 
            SUM(dc.fluxo) AS max_fluxo
        FROM ponto_monitoramento pm
        JOIN sensor s ON s.fk_ponto = pm.id_ponto_monitoramento
        JOIN dado_captado dc ON dc.fk_sensor = s.id_sensor
        WHERE pm.fk_empresa = ${idEmpresa}
        GROUP BY pm.nome, HOUR(dc.data_hora)
        ORDER BY max_fluxo DESC
        LIMIT 1;
    `;
    console.log("Executando a instrução SQL (KPI Fluxo Intenso): \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarKpiFluxoBaixo(idEmpresa) {
    //grupa pelo nome do ponto e ordena do menor pro maio
    var instrucaoSql = `
        SELECT 
            pm.nome AS setor, 
            SUM(dc.fluxo) AS min_fluxo
        FROM ponto_monitoramento pm
        JOIN sensor s ON s.fk_ponto = pm.id_ponto_monitoramento
        JOIN dado_captado dc ON dc.fk_sensor = s.id_sensor
        WHERE pm.fk_empresa = ${idEmpresa}
        GROUP BY pm.nome
        ORDER BY min_fluxo ASC
        LIMIT 1;
    `;
    console.log("Executando a instrução SQL (KPI Fluxo Baixo): \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    buscarDadosGraficoLinha,
    atualizarDadosGraficoLinha,
    buscarDadosMapaCalor,
    atualizarDadosMapaCalor,

     // KPI
    buscarKpiTotal,
    buscarKpiHorarioPico,
    buscarKpiLocalMaisAcessado,
    buscarKpiFluxoIntenso,
    buscarKpiFluxoBaixo

}
