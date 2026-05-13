var database = require("../database/config");

function buscarUltimasMedidas(limite_linhas, id_grafico) {

    var instrucaoSql = //`SELECT 
    //     dht11_temperatura as temperatura, 
    //     dht11_umidade as umidade,
    //                     momento,
    //                     DATE_FORMAT(momento,'%H:%i:%s') as momento_grafico
    //                 FROM medida
    //                 WHERE fk_aquario = ${}
    //                 ORDER BY id DESC LIMIT ${limite_linhas}`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarMedidasEmTempoReal(id_grafico) {

     var instrucaoSql = //`SELECT 
    //     dht11_temperatura as temperatura, 
    //     dht11_umidade as umidade,
    //                     DATE_FORMAT(momento,'%H:%i:%s') as momento_grafico, 
    //                     fk_aquario 
    //                     FROM medida WHERE fk_aquario = ${} 
    //                 ORDER BY id DESC LIMIT 1`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    buscarUltimasMedidas,
    buscarMedidasEmTempoReal
}
