var database = require("../database/config");

function buscarDadosGraficoLinha(idEmpresa, dataHora) {

    var instrucaoSql =
`
        SELECT
            emp.id_empresa,
            DATE_FORMAT(dc.data_hora, '%m/%d/%H') AS momento_grafico,
            COUNT(dc.fluxo) AS fluxo
        FROM empresa_parceira emp
        JOIN ponto_monitoramento pt
            ON pt.fk_empresa = emp.id_empresa
        JOIN sensor sn
            ON sn.fk_ponto = pt.id_ponto_monitoramento
        JOIN dado_captado dc
            ON dc.fk_sensor = sn.id_sensor
        WHERE emp.id_empresa = ${idEmpresa} AND DATE_FORMAT(dc.data_hora, '%d/%m') = '${dataHora}'
        GROUP BY
            emp.id_empresa,
            DATE_FORMAT(dc.data_hora, '%m/%d/%H')
        ORDER BY momento_grafico;
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function atualizarDadosGraficoLinha(idEmpresa, dataHora) {

     var instrucaoSql =
     `    
       SELECT
            emp.id_empresa,
            DATE_FORMAT(dc.data_hora, '%m/%d/%H') AS momento_grafico,
            COUNT(dc.fluxo) AS fluxo
        FROM empresa_parceira emp
        JOIN ponto_monitoramento pt
            ON pt.fk_empresa = emp.id_empresa
        JOIN sensor sn
            ON sn.fk_ponto = pt.id_ponto_monitoramento
        JOIN dado_captado dc
            ON dc.fk_sensor = sn.id_sensor
        WHERE emp.id_empresa = ${idEmpresa} AND DATE_FORMAT(dc.data_hora, '%d/%m') = '${dataHora}'
        GROUP BY
            emp.id_empresa,
            DATE_FORMAT(dc.data_hora, '%m/%d/%H')
        ORDER BY momento_grafico DESC LIMIT 1;
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarDadosMapaCalor(idEmpresa, dataHora) {

    var instrucaoSql =
    `
       SELECT 
            emp.id_empresa,
            DATE_FORMAT(dc.data_hora, '%m/%d/%H') AS momento_grafico,
            COUNT(dc.fluxo) AS fluxo,
            id_ponto_monitoramento
        FROM empresa_parceira emp
        JOIN ponto_monitoramento pt
            ON pt.fk_empresa = emp.id_empresa
        JOIN sensor sn
            ON sn.fk_ponto = pt.id_ponto_monitoramento
        JOIN dado_captado dc
            ON dc.fk_sensor = sn.id_sensor
        WHERE emp.id_empresa = ${idEmpresa} AND DATE_FORMAT(dc.data_hora, '%d/%m') = '${dataHora}'
        GROUP BY emp.id_empresa,
             emp.id_empresa,
            DATE_FORMAT(dc.data_hora, '%m/%d/%H'),
            id_ponto_monitoramento
        ORDER BY momento_grafico;
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function atualizarDadosMapaCalor(idEmpresa, dataHora) {

    var instrucaoSql =
        `
            SELECT 
            emp.id_empresa,
            DATE_FORMAT(dc.data_hora, '%m/%d/%H') AS momento_grafico,
            COUNT(dc.fluxo) AS fluxo,
            id_ponto_monitoramento
        FROM empresa_parceira emp
        JOIN ponto_monitoramento pt
            ON pt.fk_empresa = emp.id_empresa
        JOIN sensor sn
            ON sn.fk_ponto = pt.id_ponto_monitoramento
        JOIN dado_captado dc
            ON dc.fk_sensor = sn.id_sensor
        WHERE emp.id_empresa = ${idEmpresa} AND DATE_FORMAT(dc.data_hora, '%d/%m') = '${dataHora}'
        GROUP BY emp.id_empresa,
             emp.id_empresa,
            DATE_FORMAT(dc.data_hora, '%m/%d/%H'),
            id_ponto_monitoramento
        ORDER BY momento_grafico DESC LIMIT 1;
        `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarKpiTotal(idEmpresa, dataHora) {
    var instrucaoSql = `
        SELECT SUM(dc.fluxo) AS total_passagens
        FROM ponto_monitoramento pm
        JOIN sensor s ON s.fk_ponto = pm.id_ponto_monitoramento
        JOIN dado_captado dc ON dc.fk_sensor = s.id_sensor
        WHERE pm.fk_empresa = ${idEmpresa} AND DATE_FORMAT(dc.data_hora, '%d/%m') = '${dataHora}';
    `;
    console.log("Executando a instrução SQL (KPI Total): \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarKpiSetorPico(idEmpresa, dataHora) {
    // Agrupa pelo nome do ponto e ordena do maior para o menor, pegando apenas o Top 1
    var instrucaoSql = `
        SELECT nome_ponto AS setor, SUM(fluxo) AS total
        FROM dashGraficosLinha
        WHERE id_empresa = ${idEmpresa} AND DATE_FORMAT(dc.data_hora, '%d/%m') = '${dataHora}'
        GROUP BY nome_ponto
        ORDER BY total DESC
        LIMIT 1;
    `;
    console.log("Executando a instrução SQL (KPI Setor Pico): \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarKpiHorarioPico(idEmpresa, dataHora) {
    // apenas a HORA da data_hora, soma os fluxos e ordena para pegar a hora mais MANEIRA!!!!!!
    var instrucaoSql = `
        SELECT
            HOUR(dc.data_hora) AS hora_pico,
            SUM(dc.fluxo) AS total_passagens
        FROM ponto_monitoramento pm
        JOIN sensor s ON s.fk_ponto = pm.id_ponto_monitoramento
        JOIN dado_captado dc ON dc.fk_sensor = s.id_sensor
        WHERE pm.fk_empresa = ${idEmpresa} AND DATE_FORMAT(dc.data_hora, '%d/%m') = '${dataHora}'
        GROUP BY HOUR(dc.data_hora)
        ORDER BY total_passagens DESC
        LIMIT 2;
    `;

    console.log("Executando a instrução SQL (KPI Horário Pico): \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarKpiLocalMaisAcessado(idEmpresa, dataHora) {
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
        WHERE pm.fk_empresa = ${idEmpresa} AND DATE_FORMAT(dc.data_hora, '%d/%m') = '${dataHora}'
        GROUP BY pm.nome
        ORDER BY total_setor DESC
        LIMIT 1;
    `;
    console.log("Executando a instrução SQL (KPI Local Mais Acessado): \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarKpiFluxoBaixo(idEmpresa, dataHora) {
    var instrucaoSql = `
        SELECT
            pm.nome AS setor,
            SUM(dc.fluxo) AS total_passagens
        FROM ponto_monitoramento pm
        JOIN sensor s ON s.fk_ponto = pm.id_ponto_monitoramento
        JOIN dado_captado dc ON dc.fk_sensor = s.id_sensor
        WHERE pm.fk_empresa = ${idEmpresa} AND DATE_FORMAT(dc.data_hora, '%d/%m') = '${dataHora}'
        GROUP BY pm.nome
        ORDER BY total_passagens ASC
        LIMIT 1;
    `;
    console.log("Executando a instrução SQL (KPI Fluxo Baixo): \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarKpiTotalESPC(idEmpresa, idpontoMonitoramento) { //KPI ESPECIFICA 1
    var instrucaoSql = `
        SELECT SUM(dc.fluxo) AS total_passagens
        FROM ponto_monitoramento pm
        JOIN sensor s ON s.fk_ponto = pm.id_ponto_monitoramento
        JOIN dado_captado dc ON dc.fk_sensor = s.id_sensor
        WHERE pm.fk_empresa = ${idEmpresa}
        AND pm.nome = '${idpontoMonitoramento}'; 
    `;
    console.log("Executando a instrução SQL (KPI Total ESPC por Nome): \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarKpiHoraPicoESPC(idEmpresa, idpontoMonitoramento) { //KPI ESPECIFICA 2
    var instrucaoSql = `
        SELECT 
            HOUR(dc.data_hora) AS hora_pico,
            SUM(dc.fluxo) AS total_passagens
        FROM ponto_monitoramento pm
        JOIN sensor s ON s.fk_ponto = pm.id_ponto_monitoramento
        JOIN dado_captado dc ON dc.fk_sensor = s.id_sensor
        WHERE pm.fk_empresa = ${idEmpresa}
        AND pm.nome = '${idpontoMonitoramento}'
        GROUP BY HOUR(dc.data_hora)
        ORDER BY total_passagens DESC
        LIMIT 1;
    `;
    console.log("Executando a instrução SQL (KPI Hora Pico ESPC): \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarKpiConversaoESPC(idEmpresa, idpontoMonitoramento) { //KPI ESPECIFICA 3
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
            )) * 100, 1) AS porcentagem_conversao
        FROM ponto_monitoramento pm
        JOIN sensor s ON s.fk_ponto = pm.id_ponto_monitoramento
        JOIN dado_captado dc ON dc.fk_sensor = s.id_sensor
        WHERE pm.fk_empresa = ${idEmpresa} AND pm.nome = '${idpontoMonitoramento}'
        GROUP BY pm.nome;
    `;
    console.log("Executando a instrução SQL (KPI 3 - Conversão ESPC): \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarKpiFluxoBaixoESPC(idEmpresa, idpontoMonitoramento) {//KPI ESPECIFICA 4
    var instrucaoSql = `
        SELECT 
            pm.nome AS setor,
            SUM(dc.fluxo) AS total_passagens
        FROM ponto_monitoramento pm
        JOIN sensor s ON s.fk_ponto = pm.id_ponto_monitoramento
        JOIN dado_captado dc ON dc.fk_sensor = s.id_sensor
        WHERE pm.fk_empresa = ${idEmpresa} 
        AND pm.nome = '${idpontoMonitoramento}'
        GROUP BY pm.nome;
    `;
    console.log("Executando a instrução SQL (KPI 4 - Baixo Fluxo ESPC): \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function selectDias(idEmpresa) {
    var instrucaoSql = 
    `
         SELECT
            emp.id_empresa,
            DATE_FORMAT(dc.data_hora, '%d/%m') AS momento_grafico,
            COUNT(dc.fluxo) AS fluxo
        FROM empresa_parceira emp
        JOIN ponto_monitoramento pt
            ON pt.fk_empresa = emp.id_empresa
        JOIN sensor sn
            ON sn.fk_ponto = pt.id_ponto_monitoramento
        JOIN dado_captado dc
            ON dc.fk_sensor = sn.id_sensor
        WHERE emp.id_empresa = ${idEmpresa} AND fluxo > 0
        GROUP BY
            emp.id_empresa,
            DATE_FORMAT(dc.data_hora, '%d/%m')
        ORDER BY momento_grafico;
    `;
    console.log("Executando a instrução SQL (KPI Total ESPC): \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function dadosEmpresa(idEmpresa) {
    var instrucaoSql = 
    `
         SELECT
            e.nome,
            e.endereco_sede
        FROM empresa_parceira AS e
        WHERE id_empresa = ${idEmpresa}
    `;
    console.log("Executando a instrução SQL (KPI Total ESPC): \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    buscarDadosGraficoLinha,
    atualizarDadosGraficoLinha,
    buscarDadosMapaCalor,
    atualizarDadosMapaCalor,
    // KPI
    buscarKpiTotal,
    buscarKpiSetorPico,
    buscarKpiHorarioPico,
    buscarKpiLocalMaisAcessado,
    buscarKpiFluxoBaixo,
    // KPI especifica
    buscarKpiTotalESPC,
    buscarKpiHoraPicoESPC,
    buscarKpiConversaoESPC,
    buscarKpiFluxoBaixoESPC,
    //select
    selectDias,
    // dados empresa
    dadosEmpresa
}

