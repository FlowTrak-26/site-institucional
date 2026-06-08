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
	var instrucaoSql = `SELECT * FROM empresa_parceira WHERE cnpj = '${cnpj}'`;

	return database.executar(instrucaoSql);
}

function atualizar(id_empresa, nome, cnpj, endereco_sede, telefone, email) {

	console.log("Executando comando atualizar SQL das empresas parceiras: \n" + instrucaoSql);

	var instrucaoSql = 
		`
			UPDATE empresa_parceira 
			SET nome = '${nome}',
					cnpj = '${cnpj}',
					endereco_sede = '${endereco_sede}',
					telefone = '${telefone}',
					email = '${email}'
			WHERE id_empresa = ${id_empresa};
		`;

	return database.executar(instrucaoSql);
}

module.exports = { buscarPorCnpj, buscarPorId, atualizar, listar };
