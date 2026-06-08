var express = require("express");
var router = express.Router();

var dashController = require("../controllers/dashController");

router.get("/ultimas/grafico-linha/:idEmpresa", function (req, res) {
    dashController.buscarDadosGraficoLinha(req, res);
});

router.get("/tempo-real/grafico-linha/:idEmpresa", function (req, res) {
    dashController.atualizarDadosGraficoLinha(req, res);
})



router.get("/ultimas/grafico-calor/:idEmpresa", function (req, res) {
    dashController.buscarDadosMapaCalor(req, res);
});

router.get("/tempo-real/grafico-calor/:idEmpresa", function (req, res) {
    dashController.atualizarDadosMapaCalor(req, res);
})



router.get("/ultimas/grafico-linha/:idEmpresa/:idpontoMonitoramento", function (req, res) {
    dashController.buscarDadosGraficoLinhaEsp(req, res);
});

router.get("/tempo-real/grafico-linha/:idEmpresa/:idpontoMonitoramento", function (req, res) {
    dashController.atualizarDadosGrafico(req, res);
})



router.get("/ultimas/grafico-calor/:idEmpresa/:idpontoMonitoramento", function (req, res) {
    dashController.buscarDadosMapaCalorEsp(req, res);
});

router.get("/tempo-real/grafico-calor/:idEmpresa/:idpontoMonitoramento", function (req, res) {
    dashController.atualizarDadosMapaCalorEsp(req, res);
})

module.exports = router;

