CREATE DATABASE flowtrak;
USE flowtrak;

CREATE TABLE empresa_parceira(
	id_empresa INT PRIMARY KEY AUTO_INCREMENT, 
	nome VARCHAR(45),
	cnpj CHAR(14),
	endereco_sede VARCHAR(45),
	email VARCHAR(45),
	telefone CHAR(9),
	franqueadora INT,
	CONSTRAINT ctFkFranqueadora FOREIGN KEY(franqueadora) REFERENCES empresa_parceira(id_empresa)
);

CREATE TABLE usuario(
	id_usuario INT PRIMARY KEY AUTO_INCREMENT,
	nome VARCHAR(45),
	email VARCHAR(45),
	senha VARCHAR(45),
	nivel_acesso VARCHAR(45) DEFAULT 'COMUM',
	fk_empresa_parceira INT,
	CONSTRAINT ctFkEmpresaParceira FOREIGN KEY(fk_empresa_parceira) REFERENCES empresa_parceira(id_empresa),
	CONSTRAINT ctNivelAcesso CHECK (nivel_acesso IN ('ADMIN','COMUM'))
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
    nome VARCHAR(45),
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
	('Victor', 'victor@carrefour.com', '123', 1, 'COMUM'),
	('Isaac', 'isaac@extra.com', '123', 2, 'ADMIN'),
	('Karina', 'karina@bh.com', '123', 3, 'COMUM'),
	('Caio', 'caio@assai.com', '123', 4, 'ADMIN'),
	('Emanuelly', 'emanuelly@muffato.com', '123', 5, 'COMUM');

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
	('2023-10-27 08:10:00', 1, 2),
	('2023-10-27 09:00:00', 1, 3),
	('2023-10-27 09:30:00', 1, 5);
    
INSERT INTO dado_captado (data_hora, fluxo, fk_sensor) VALUES 
	('2023-10-27 09:00:00', 1, 1),
	('2023-10-27 09:05:00', 1, 1),
	('2023-10-27 09:10:00', 1, 1),
	('2023-10-27 09:15:00', 1, 1),
	('2023-10-27 09:20:00', 1, 1);
    
    SELECT * FROM dado_captado;

/*
SELECT * FROM sensor;
SELECT * FROM ponto_monitoramento;
SELECT * FROM usuario;
SELECT * FROM dado_captado;
SELECT * FROM empresa_parceira;
*/

SELECT
	s.status, 
	p.nome, 
	e.nome 
FROM sensor AS s
JOIN ponto_monitoramento AS p ON s.fk_ponto = id_ponto_monitoramento
JOIN empresa_parceira AS e ON e.id_empresa = fk_empresa;

SELECT 
	s.nome,
	s.id_sensor
FROM sensor AS s
JOIN dado_captado AS dc ON dc.fk_sensor = id_sensor;

UPDATE sensor SET nome = 'Caixa1' WHERE id_sensor = 1;
UPDATE sensor SET nome = 'Caixa2' WHERE id_sensor = 2;
UPDATE sensor SET nome = 'Corredor Doces' WHERE id_sensor = 3;
UPDATE sensor SET nome = 'Corredor Limpeza' WHERE id_sensor = 4;
UPDATE sensor SET nome = 'Frios' WHERE id_sensor = 5;
UPDATE sensor SET nome = 'Entrada' WHERE id_sensor = 3;
UPDATE sensor SET nome = 'Saída' WHERE id_sensor = 4;


SELECT 
	s.id_sensor,
	pm.nome,
	dc.fluxo,
	dc.data_hora
FROM ponto_monitoramento AS pm 
JOIN sensor AS s ON fk_ponto = id_ponto_monitoramento
JOIN dado_captado AS dc ON fk_sensor = id_sensor
WHERE dc.data_hora 
BETWEEN '2023-10-27 08:00:00' AND '2023-10-27 09:30:00';

-- Views para Dashboard

CREATE VIEW dashGraficosLinha AS 
SELECT 
	emp.id_empresa AS id_empresa,
	emp.franqueadora AS id_franquiadora,
	pt.id_ponto_monitoramento AS id_ponto,
	pt.nome AS nome_ponto,
	pt.fk_empresa,
	sn.id_sensor,
	sn.status AS status_sensor,
	sn.fk_ponto,
	d_cpt.id_dado_captado AS id_dado_cpt,
	d_cpt.data_hora AS momento_grafico,
	d_cpt.fluxo,
	d_cpt.fk_sensor
FROM empresa_parceira AS emp
LEFT JOIN empresa_parceira AS franq
ON emp.franqueadora = franq.id_empresa
LEFT JOIN ponto_monitoramento AS pt
ON pt.fk_empresa = emp.id_empresa
LEFT JOIN sensor AS sn
ON sn.fk_ponto = pt.id_ponto_monitoramento
LEFT JOIN dado_captado AS d_cpt
ON d_cpt.fk_sensor = sn.id_sensor;

SELECT * FROM usuario;

DESC ponto_monitoramento;

SELECT
    emp.id_empresa,
    DATE_FORMAT(dc.data_hora, '%H') AS momento_grafico,
    COUNT(dc.fluxo) AS fluxo
FROM empresa_parceira emp
JOIN ponto_monitoramento pt
    ON pt.fk_empresa = emp.id_empresa
JOIN sensor sn
    ON sn.fk_ponto = pt.id_ponto_monitoramento
JOIN dado_captado dc
    ON dc.fk_sensor = sn.id_sensor
WHERE emp.id_empresa = 1
GROUP BY
    emp.id_empresa,
    DATE_FORMAT(dc.data_hora, '%H')
ORDER BY DATE_FORMAT(dc.data_hora, '%H');
