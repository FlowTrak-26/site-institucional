var database = require("../database/config");

function buscarPorId(id) {
	var instrucaoSql = `SELECT * FROM empresa WHERE id = '${id}'`;

	return database.executar(instrucaoSql);
}

function listar() {
	// tabela e colunas reais do script SQL 
	var instrucaoSql = `
SELECT id_empresa, nome, endereco_sede FROM empresa_parceira;
`;
	console.log("Executando SQL das empresas parceiras: \n" + instrucaoSql);
	return database.executar(instrucaoSql);
}

function buscarPorCnpj(cnpj) {
	var instrucaoSql = `SELECT * FROM empresa WHERE cnpj = '${cnpj}'`;

	return database.executar(instrucaoSql);
}

function cadastrar(nome, cnpj, endereco_sede, telefone, email) {
	var instrucaoSql = 
		`
			INSERT INTO 
			empresa_parceira (nome, cnpj, endereco_sede, telefone, email, franqueadora)
			VALUES 
			('${nome}', '${cnpj}', '${endereco_sede}', '${telefone}', '${email}', null)`;

	return database.executar(instrucaoSql);
}

module.exports = { buscarPorCnpj, buscarPorId, cadastrar, listar };
