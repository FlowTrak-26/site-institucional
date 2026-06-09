var dashModel = require("../models/dashModel");

function buscarDadosGraficoLinha(req, res) {

    var idEmpresa = req.params.idEmpresa;
    var dataHora = req.query.dataHora;

    console.log(`Recuperando as ultimas medidas`);
    
    dashModel.buscarDadosGraficoLinha(idEmpresa, dataHora).then(function (resultado) {
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
    var dataHora = req.query.dataHora;

    console.log(`Recuperando medidas em tempo real`);

    dashModel.atualizarDadosGraficoLinha(idEmpresa, dataHora).then(function (resultado) {
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
    var dataHora = req.query.dataHora;

    dashModel.buscarDadosMapaCalor(idEmpresa, dataHora).then(function (resultado) {
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
    var dataHora = req.query.dataHora;

    dashModel.atualizarDadosMapaCalor(idEmpresa, dataHora).then(function (resultado) {
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
    var dataHora = req.query.dataHora;

    dashModel.buscarKpiTotal(idEmpresa, dataHora).then(function (resultado) {
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

function buscarKpiLocalMaisAcessado(req, res) {
    var idEmpresa = req.params.idEmpresa;
    var dataHora = req.query.dataHora;

    dashModel.buscarKpiLocalMaisAcessado(idEmpresa, dataHora).then(function (resultado) {
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

function buscarKpiHorarioPico(req, res) {
    var idEmpresa = req.params.idEmpresa;
    var dataHora = req.query.dataHora;

    dashModel.buscarKpiHorarioPico(idEmpresa, dataHora).then(function (resultado) {
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

function buscarKpiFluxoBaixo(req, res) {
    var idEmpresa = req.params.idEmpresa;
    var dataHora = req.query.dataHora;

    dashModel.buscarKpiFluxoBaixo(idEmpresa, dataHora).then(function (resultado) {
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

function buscarKpiTotalESPC(req, res) { // KPI ESPECIFICA 1
    var idpontoMonitoramento = req.params.idpontoMonitoramento;
    var idEmpresa = req.params.idEmpresa;

    console.log(`[KPI ESPC] Buscando total do ponto de monitoramento: ${idpontoMonitoramento} para a empresa ${idEmpresa}`);

   
    dashModel.buscarKpiTotalESPC(idEmpresa, idpontoMonitoramento).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!");
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar o KPI Total Específico.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function buscarKpiHoraPicoESPC(req, res) { //KPI ESPECIFICA 2
    var idpontoMonitoramento = req.params.idpontoMonitoramento;
    var idEmpresa = req.params.idEmpresa;

    console.log(`[KPI ESPC] Buscando horário de pico do ponto: ${idpontoMonitoramento}`);

    dashModel.buscarKpiHoraPicoESPC(idEmpresa, idpontoMonitoramento).then(function (resultado) {
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

function buscarKpiConversaoESPC(req, res) { //KPI ESPECIFICA 3
    var idpontoMonitoramento = req.params.idpontoMonitoramento;
    var idEmpresa = req.params.idEmpresa;

    console.log(`[KPI 3 ESPC] Calculando taxa de conversão do setor: ${idpontoMonitoramento}`);

    dashModel.buscarKpiConversaoESPC(idEmpresa, idpontoMonitoramento).then(function (resultado) {
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

function buscarKpiFluxoBaixoESPC(req, res) { //KPI ESPECIFICA 4
    var idpontoMonitoramento = req.params.idpontoMonitoramento;
    var idEmpresa = req.params.idEmpresa;

    console.log(`[KPI 4 ESPC] Verificando nível de abandono do setor: ${idpontoMonitoramento}`);

    dashModel.buscarKpiFluxoBaixoESPC(idEmpresa, idpontoMonitoramento).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado[0]);
        } else {
            // 
            res.status(200).json({ setor: idpontoMonitoramento, total_passagens: 0 });
        }
    }).catch(function (erro) {
        console.log(erro);
        res.status(500).json(erro.sqlMessage);
    });
}

function selectDias(req, res){
    var idEmpresa = req.params.idEmpresa;

     dashModel.selectDias(idEmpresa).then(function (resultado) {
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

function dadosEmpresa(req, res){
    var idEmpresa = req.params.idEmpresa;

     dashModel.dadosEmpresa(idEmpresa).then(function (resultado) {
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
    // KPI
    buscarKpiTotal,
    buscarKpiHorarioPico,
    buscarKpiLocalMaisAcessado,
    buscarKpiFluxoBaixo,
    // KPI especificas 
    buscarKpiTotalESPC,
    buscarKpiHoraPicoESPC,
    buscarKpiFluxoBaixoESPC,
    buscarKpiConversaoESPC,
    // select dias
    selectDias,
    // dados empresa
    dadosEmpresa
}