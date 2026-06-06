var express = require("express");
var router = express.Router();

var dashController = require("../controllers/dashController");

router.get("/ultimas/grafico-linha", function (req, res) {
    dashController.buscarDadosGraficoLinha(req, res);
});

router.get("/tempo-real/grafico-linha", function (req, res) {
    dashController.atualizarDadosGraficoLinha(req, res);
})



router.get("/ultimas/grafico-calor", function (req, res) {
    dashController.buscarDadosMapaCalor(req, res);
});

router.get("/tempo-real/grafico-calor", function (req, res) {
    dashController.atualizarDadosMapaCalor(req, res);
})

module.exports = router;


function redirecionamento_perfil() {
	if(permissao == "ADMIN"){
		window.location.href = './perfil/perfil-admin.html'
	}
	else{
		window.location.href = './perfil/perfil-u-comum.html'
	}
}
