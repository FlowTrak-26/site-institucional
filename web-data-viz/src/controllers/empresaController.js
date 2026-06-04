var empresaModel = require("../models/empresaModel");

function buscarPorCnpj(req, res) {
  var cnpj = req.query.cnpj;

  empresaModel.buscarPorCnpj(cnpj).then((resultado) => {
    res.status(200).json(resultado);
  });
}

function listar(req, res) {
  empresaModel.listar().then((resultado) => {
    res.status(200).json(resultado);
  });
}

function buscarPorId(req, res) {
  var id = req.params.id;

  empresaModel.buscarPorId(id).then((resultado) => {
    res.status(200).json(resultado);
  });
}

function cadastrar(req, res) {
  var telefone = req.body.telefoneServer;
  var cnpj = req.body.cnpjServer;
  var nome = req.body.nomeServer;

  if (nome == undefined) {
    res.status(400).send("Seu nome está undefined!");
  } else if (email == undefined) {
    res.status(400).send("Seu email está undefined!");
  } else if (cnpj == undefined) {
    res.status(400).send("Sua senha está undefined!");
  } else if (telefone == undefined) {
    res.status(400).send("Sua telefone está undefined!");
  } else {

    empresaModel.buscarPorCnpj(cnpj).then((resultado) => {
      if (resultado.length > 0) {
        res
          .status(401)
          .json({ mensagem: `a empresa com o cnpj ${cnpj} já existe` });
      } else {
        empresaModel.cadastrar(nome, cnpj, telefone).then((resultado) => {
          res.status(201).json(resultado);
        });
      }
    });
  }
}

module.exports = {
  buscarPorCnpj,
  buscarPorId,
  cadastrar,
  listar,
};
