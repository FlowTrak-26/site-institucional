var dashModel = require("../models/dashModel");

function buscarDadosGraficoLinha(req, res) {

    const limite_linhas = 7;

    var idEmpresa = req.params.idEmpresa;

    console.log(`Recuperando as ultimas ${limite_linhas} medidas`);

    dashModel.buscarDadosGraficoLinha(idEmpresa, limite_linhas).then(function (resultado) {
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

    var idEmpresa = req.params.idEmpresa;

    console.log(`Recuperando medidas em tempo real`);

    dashModel.atualizarDadosGraficoLinha(idEmpresa).then(function (resultado) {
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
    var idEmpresa = req.params.idEmpresa;

    dashModel.buscarDadosMapaCalor(idEmpresa).then(function (resultado) {
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

    var idEmpresa = req.params.idEmpresa;
    console.log(`Recuperando medidas em tempo real`);

    dashModel.atualizarDadosMapaCalor(idEmpresa).then(function (resultado) {
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


function buscarKpiTotal(req, res) {
    var idEmpresa = req.params.idEmpresa;

    dashModel.buscarKpiTotal(idEmpresa).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado[0]); //  apenas o primeiro objeto com a soma
        } else {
            res.status(204).send("Nenhum resultado encontrado!");
        }
    }).catch(function (erro) {
        console.log(erro);
        res.status(500).json(erro.sqlMessage);
    });
}

function buscarDadosGraficoLinhaEsp(req, res) {

    var idEmpresa = req.params.idEmpresa;
    var idpontoMonitoramento = req.params.idpontoMonitoramento;


    console.log(`Recuperando medidas em tempo real`);

    dashModel.atualizarDadosMapaCalor(idpontoMonitoramento, idEmpresa).then(function (resultado) {
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

function atualizarDadosGraficoLinhaEsp(req, res) {

    var idEmpresa = req.params.idEmpresa;
    var idpontoMonitoramento = req.params.idpontoMonitoramento;

    console.log(`Recuperando medidas em tempo real`);

    dashModel.atualizarDadosGraficoLinha(idpontoMonitoramento, idEmpresa).then(function (resultado) {
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


function buscarKpiHorarioPico(req, res) {
    var idEmpresa = req.params.idEmpresa;

    dashModel.buscarKpiHorarioPico(idEmpresa).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado[0]); // Envia o primeiro registro encontrado { hora_pico: X, total_passagens: Y }
        } else {
            res.status(204).send("Nenhum resultado encontrado!");
        }
    }).catch(function (erro) {
        console.log(erro);
        res.status(500).json(erro.sqlMessage);
    });
}

function buscarDadosMapaCalorEsp(req, res) {

    const limite_linhas = 7;

    var idEmpresa = req.params.idEmpresa;
    var idpontoMonitoramento = req.params.idpontoMonitoramento;


    console.log(`Recuperando as ultimas ${limite_linhas} medidas`);

    dashModel.buscarDadosMapaCalor(idpontoMonitoramento, idEmpresa, limite_linhas).then(function (resultado) {
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


function buscarKpiLocalMaisAcessado(req, res) {
    var idEmpresa = req.params.idEmpresa;

    dashModel.buscarKpiLocalMaisAcessado(idEmpresa).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado[0]);
        } else {
            res.status(204).send("Nenhum resultado encontrado!");
        }
    }).catch(function (erro) {
        console.log(erro);
        res.status(500).json(erro.sqlMessage);
    });
}

function buscarKpiFluxoIntenso(req, res) {
    var idEmpresa = req.params.idEmpresa;

    dashModel.buscarKpiFluxoIntenso(idEmpresa).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado[0]);
        } else {
            res.status(204).send("Nenhum resultado encontrado!");
        }
    }).catch(function (erro) {
        console.log(erro);
        res.status(500).json(erro.sqlMessage);
    });
}

function buscarKpiFluxoBaixo(req, res) {
    var idEmpresa = req.params.idEmpresa;

    dashModel.buscarKpiFluxoBaixo(idEmpresa).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado[0]);
        } else {
            res.status(204).send("Nenhum resultado encontrado!");
        }
    }).catch(function (erro) {
        console.log(erro);
        res.status(500).json(erro.sqlMessage);
    });
}
function atualizarDadosMapaCalorEsp(req, res) {

    var idpontoMonitoramento = req.params.idpontoMonitoramento;
    var idEmpresa = req.params.idEmpresa;

    console.log(`Recuperando medidas em tempo real`);

    dashModel.atualizarDadosMapaCalor(idpontoMonitoramento, idEmpresa).then(function (resultado) {
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
    atualizarDadosGraficoLinha,
    buscarDadosMapaCalor,
    atualizarDadosMapaCalor,
    buscarDadosGraficoLinhaEsp,
    atualizarDadosGraficoLinhaEsp,
    buscarDadosMapaCalorEsp,
    atualizarDadosGraficoLinhaEsp,
     // KPI
    buscarKpiTotal,
    buscarKpiHorarioPico,
    buscarKpiLocalMaisAcessado,
    buscarKpiFluxoIntenso,
    buscarKpiFluxoBaixo,
    }