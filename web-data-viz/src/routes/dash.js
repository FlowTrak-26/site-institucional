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

module.exports = router;