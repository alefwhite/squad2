/*
	Script de DML Para teste
*/

USE fcamara;

-- tipo_usuario
INSERT INTO tipo_usuario(nivel) VALUES('adm'),('gestor'),('funcionario');

-- cargo
INSERT INTO cargo(nome) VALUES('administrador do sistema'),('desenvolvedor fullstack'),('analista de sistemas'),('desenvolvedor mobile'),('engenheiro de software');
SELECT * FROM cargo;

-- status_usuario
INSERT INTO status_usuario(tipo) VALUES('ativo'),('inativo'),('ferias');

-- usuario
INSERT INTO usuario(nome, email, senha, cpf, id_tipousuario, id_cargo, id_status) 
VALUES('administrador', 'adm@adm.com', '123', '00000000000', 1, 1, 1),('Clemente Rodrigues', 'cleme@gmail.com', '321', '45627388820', 3, 2, 1);
SELECT * FROM usuario;

-- projeto
INSERT INTO projeto(nome, descricao, data_inicial, data_final, id_criador) VALUES('Erp Facil', 'desenvolvimento de um erp integrando com crm', '2020-07-11', '2021-07-11', 1);
SELECT * FROM projeto;

-- timesheet 
INSERT INTO timesheet(entrada, id_usuario) VALUES('09:00:00', 1);
SELECT * FROM timesheet;

-- squad
INSERT INTO squad(nome, id_criador) VALUES('Squad Erp Facil', 1);
SELECT * FROM squad;

-- squad_usuario
INSERT INTO squad_usuario(id_squad, id_usuario) VALUES(1, 3);
SELECT * FROM squad_usuario;

-- tarefa
INSERT INTO tarefa(descricao, prazo, hora_estimada, id_criador, id_projeto) VALUES('Desenvolver tela de login', '2020-08-1', '128', 1, 1),('Desenvolver formulário de cadastro', '2020-08-2', '128:00:00', 1, 1);
SELECT * FROM tarefa;

-- squad_tarefa
INSERT INTO squad_tarefa(id_squad, id_tarefa) VALUES(1, 1);
SELECT * FROM squad_tarefa;

-- usuario_tarefa
INSERT INTO usuario_tarefa(id_usuario, id_tarefa) VALUES(3, 2);
SELECT * FROM usuario_tarefa;


select * from usuario;

delete from usuario where id_usuario = 25;

select * from tipo_usuario;