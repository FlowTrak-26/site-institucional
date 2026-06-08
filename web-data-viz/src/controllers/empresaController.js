var empresaModel = require("../models/empresaModel");

function buscarPorCnpj(req, res) {
  var cnpj = req.query.cnpj;

  empresaModel.buscarPorCnpj(cnpj).then((resultado) => {
    res.status(200).json(resultado);
  });
}


function listar(req, res) {
    empresaModel.listar()
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado); //envia a lista real para o front
            } else {
                res.status(204).send("Nenhuma filial encontrada.");
            }
        })
        .catch(function (erro) {
            console.log("Erro ao listar:", erro);
            res.status(500).json(erro);
        });
}



function buscarPorId(req, res) {
  var id = req.params.id;

  empresaModel.buscarPorId(id).then((resultado) => {
    res.status(200).json(resultado);
  });
}

function cadastrar(req, res) {
  console.log(req.body);
  

  var telefone = req.body.telefoneServer;
  var cnpj = req.body.cnpjServer;
  var nome = req.body.nomeServer;
  var email = req.body.emailServer;
	var endereco_sede = req.body.enderecoServer;

  if (nome == undefined) {
    res.status(400).send("Seu nome está undefined!");
  } else if (email == undefined) {
    res.status(400).send("Seu email está undefined!");
  } else if (cnpj == undefined) {
    res.status(400).send("Seu CNPJ está undefined!");
  } else if (telefone == undefined) {
    res.status(400).send("Sua telefone está undefined!");
  } else {

    if (nome.length > 45){
      console.log("Nome com mais de 45 caracteres", nome)
    }
    if (cnpj.length != 14){
      console.log("CNPJ inválido", cnpj)
    }
    if (telefone.length != 9){
      console.log("Telefone inválido", telefone)
    }
    if (email.length > 45 || endereco_sede > 45){
      console.log("Email ou endereço com mais de 45 caracteres", email);
    }

    empresaModel.buscarPorCnpj(cnpj).then((resultado) => {
      if (resultado.length > 0) {
        res
          .status(401)
          .json({ mensagem: `a empresa com o cnpj ${cnpj} já existe` });
      } else {
        empresaModel.cadastrar(nome, cnpj, endereco_sede, telefone, email).then((resultado) => {
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
