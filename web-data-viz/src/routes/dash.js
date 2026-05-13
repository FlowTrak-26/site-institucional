var express = require("express");
var router = express.Router();

var dashController = require("../controllers/dashController");

router.get("/ultimas/:id_grafico", function (req, res) {
    dashController.buscarUltimasMedidas(req, res);
});

router.get("/tempo-real/:id_grafico", function (req, res) {
    dashController.buscarMedidasEmTempoReal(req, res);
})

module.exports = router;