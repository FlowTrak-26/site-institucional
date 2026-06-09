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

router.get("/kpi/total/:idEmpresa", function (req, res) {
    dashController.buscarKpiTotal(req, res);
});

router.get("/kpi/horario-pico/:idEmpresa", function (req, res) {
    dashController.buscarKpiHorarioPico(req, res);
});

router.get("/kpi/local-mais-acessado/:idEmpresa", function (req, res) {
    dashController.buscarKpiLocalMaisAcessado(req, res);
});

router.get("/kpi/fluxo-baixo/:idEmpresa", function (req, res) {
    dashController.buscarKpiFluxoBaixo(req, res);
});

router.get("/kpi/total-ESPC/:idEmpresa/:idpontoMonitoramento", function (req, res) { // KPI ESPECIFICA 1
    dashController.buscarKpiTotalESPC(req, res);
});

router.get("/kpi/hora-pico-ESPC/:idEmpresa/:idpontoMonitoramento", function (req, res) { // KPI ESPECIFICA 2
    dashController.buscarKpiHoraPicoESPC(req, res);
});

router.get("/kpi/conversao-ESPC/:idEmpresa/:idpontoMonitoramento", function (req, res) { // KPI ESPECIFICA 3
    dashController.buscarKpiConversaoESPC(req, res);
});

router.get("/kpi/fluxo-baixo-ESPC/:idEmpresa/:idpontoMonitoramento", function (req, res) { // KPI ESPECIFICA 4
    dashController.buscarKpiFluxoBaixoESPC(req, res);
});

router.get("/select-dias/:idEmpresa", function (req, res) {
    dashController.selectDias(req, res);
});

router.get("/dadosEmpresa/:idEmpresa", function (req, res) {
    dashController.dadosEmpresa(req, res);
});

router.get("/pontos/:idEmpresa", function(req,res){
    dashController.buscarPontos(req,res);
});

router.get("/dias/:idEmpresa", function(req,res){
    dashController.buscarDias(req,res);
});

router.get("/dias/:idEmpresa", function(req,res){
    dashController.buscarDias(req,res);
});

router.get("/ultimas/grafico-linha-espc/:idEmpresa", function(req,res){
    dashController.buscarDadosGraficoLinhaESPC(req,res);
});

router.get("/tempo-real/grafico-linha-espc/:idEmpresa", function(req,res){
    dashController.atualizarDadosGraficoLinhaESPC(req,res);
});

router.get("/ultimas/grafico-calor-espc/:idEmpresa", function(req,res){
    dashController.buscarDadosMapaCalorESPC(req,res);
});

router.get("/tempo-real/grafico-calor-espc/:idEmpresa", function(req,res){
    dashController.atualizarDadosMapaCalorESPC(req,res);
});

module.exports = router;
