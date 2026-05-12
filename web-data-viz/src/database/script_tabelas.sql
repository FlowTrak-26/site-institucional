DROP DATABASE IF EXISTS flowtrak;
CREATE DATABASE flowtrak;
USE flowtrak;

CREATE TABLE empresa_parceira(
	id_empresa INT PRIMARY KEY AUTO_INCREMENT, 
	nome VARCHAR(45),
  cnpj CHAR(14),
	endereco_sede VARCHAR(45), 
	franqueadora INT,
	CONSTRAINT ctFkFranqueadora FOREIGN KEY(franqueadora) REFERENCES empresa_parceira(id_empresa)
);

CREATE TABLE usuario(
	id_usuario INT PRIMARY KEY AUTO_INCREMENT,
	nome VARCHAR(45),
	email VARCHAR(45),
	senha VARCHAR(45),
	nivel_acesso VARCHAR(45),
	fk_empresa_parceira INT,
	CONSTRAINT ctFkEmpresaParceira FOREIGN KEY(fk_empresa_parceira) REFERENCES empresa_parceira(id_empresa),
	CONSTRAINT ctNivelAcesso CHECK (nivel_acesso IN ('ADMIN','OPERADOR'))
);

CREATE TABLE ponto_monitoramento (
	id_ponto_monitoramento INT PRIMARY KEY AUTO_INCREMENT,
	nome VARCHAR(45),
	fk_empresa INT,
	CONSTRAINT ctFkEmpresa FOREIGN KEY(fk_empresa) REFERENCES empresa_parceira(id_empresa)
);

CREATE TABLE sensor(
	id_sensor INT PRIMARY KEY AUTO_INCREMENT,
	fk_ponto INT,
	status VARCHAR(45),
	CONSTRAINT ctFkPontoMonitoramento FOREIGN KEY (fk_ponto) REFERENCES ponto_monitoramento(id_ponto_monitoramento),
	CONSTRAINT ctStatus CHECK (status IN ('ATIVO','DESATIVADO'))
);

CREATE TABLE dado_captado(
	id_dado_captado INT PRIMARY KEY AUTO_INCREMENT, 
	fk_sensor INT,
	data_hora DATETIME DEFAULT CURRENT_TIMESTAMP,
	fluxo TINYINT, 
	CONSTRAINT ctFkDadoSensor FOREIGN KEY(fk_sensor) REFERENCES sensor(id_sensor)
);

INSERT INTO empresa_parceira (nome, cnpj, endereco_sede, franqueadora) VALUES 
('Carrefour', '45543915000181', 'Av. das Nações Unidas, 15187', NULL),
('Extra', '06402330000129', 'Av. Brigadeiro Luís Antônio, 3172', NULL),
('Supermercados BH', '04641376000136', 'Rod. MG-010, KM 18', NULL),
('Assaí Atacadista', '06057223000171', 'Av. Aricanduva, 5555', NULL),
('Muffato', '01648512000108', 'Rod. Celso Garcia Cid, 1100', NULL);

INSERT INTO usuario (nome, email, senha, fk_empresa_parceira, nivel_acesso) VALUES 
('Vitor', 'vitor@carrefour.com', '123', 1, 'ADMIN'),
('Victor', 'victor@carrefour.com', '123', 1, 'OPERADOR'),
('Isaac', 'isaac@extra.com', '123', 2, 'ADMIN'),
('Karina', 'karina@bh.com', '123', 3, 'OPERADOR'),
('Caio', 'caio@assai.com', '123', 4, 'ADMIN'),
('Emanuelly', 'emanuelly@muffato.com', '123', 5, 'OPERADOR');

INSERT INTO ponto_monitoramento (nome, fk_empresa) VALUES 
('Entrada Principal', 1),
('Setor Hortifruti', 1),
('Caixas Rápidos', 2),
('Corredor Central', 3),
('Área de Carga', 4);

INSERT INTO sensor (fk_ponto, status) VALUES 
(1, 'ATIVO'),
(2, 'ATIVO'),
(3, 'ATIVO'),
(4, 'DESATIVADO'),
(5, 'ATIVO');

INSERT INTO dado_captado (data_hora, fluxo, fk_sensor) VALUES 
('2023-10-27 08:00:00', 1, 1),
('2023-10-27 08:05:00', 1, 1),
('2023-10-27 08:10:00', 0, 2),
('2023-10-27 09:00:00', 1, 3),
('2023-10-27 09:30:00', 1, 5);


