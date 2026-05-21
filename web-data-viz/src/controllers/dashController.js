var dashModel = require("../models/dashModel");

function buscarDadosGraficoLinha(req, res) {

    const limite_linhas = 7;

    var id_grafico = req.params.id_grafico;

    console.log(`Recuperando as ultimas ${limite_linhas} medidas`);

    dashModel.buscarDadosGraficoLinha(id_grafico, limite_linhas).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar os ultimos dados recebidos.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}


function atualizarDadosGraficoLinha(req, res) {

    var id_grafico = req.params.id_grafico;

    console.log(`Recuperando medidas em tempo real`);

    dashModel.atualizarDadosGraficoLinha(id_grafico).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}



function buscarDadosMapaCalor(req, res) {

    const limite_linhas = 7;

    var id_grafico = req.params.id_grafico;

    console.log(`Recuperando as ultimas ${limite_linhas} medidas`);

    dashModel.buscarDadosMapaCalor(id_grafico, limite_linhas).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function atualizarDadosMapaCalor(req, res) {

    var id_grafico = req.params.id_grafico;

    console.log(`Recuperando medidas em tempo real`);

    dashModel.atualizarDadosMapaCalor(id_grafico).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

module.exports = {
    buscarDadosGraficoLinha,
    atualizarDadosMapaCalor

}
