/*
	Script de DDL
*/
-- DROP DATABASE fcamara; 

-- CREATE DATABASE fcamara;

USE fcamara;

CREATE TABLE tipo_usuario (
	id_tipousuario INT PRIMARY KEY AUTO_INCREMENT,
    nivel VARCHAR(50) UNIQUE NOT NULL
);

CREATE TABLE cargo (
	id_cargo INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(255) UNIQUE NOT NULL
);

CREATE TABLE status_usuario (
	id_status INT PRIMARY KEY AUTO_INCREMENT,
    tipo VARCHAR(255) UNIQUE NOT NULL
);

CREATE TABLE usuario (
	id_usuario INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(255) NOT NULL,
	nome_social VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    senha VARCHAR(255) NOT NULL,
    cpf char(11) UNIQUE NOT NULL,
    codigo VARCHAR(255) UNIQUE,
    id_criador INT,
    id_tipousuario INT NOT NULL,
    id_cargo INT NOT NULL,
    id_status INT NOT NULL DEFAULT(1),
    
	FOREIGN KEY(id_tipousuario) REFERENCES tipo_usuario(id_tipousuario),
    FOREIGN KEY(id_cargo) REFERENCES cargo(id_cargo),
	FOREIGN KEY(id_status) REFERENCES status_usuario(id_status),
	FOREIGN KEY(id_criador) REFERENCES usuario(id_usuario)
);

CREATE TABLE projeto (
	id_projeto INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(255) NOT NULL,
    descricao TEXT NOT NULL,
    data_inicial DATE NOT NULL,
    data_final DATE NOT NULL,
    id_criador INT NOT NULL,
    
    FOREIGN KEY(id_criador) REFERENCES usuario(id_usuario)
);

CREATE TABLE timesheet (
	id_timesheet INT PRIMARY KEY AUTO_INCREMENT,
	data_ponto DATE NOT NULL,
    entrada TIME NOT NULL,
    almoco_ida TIME,
    almoco_volta TIME,
    saida TIME,
    hora_extra TIME DEFAULT(0),
	hora_negativa TIME DEFAULT(0),
    id_usuario INT NOT NULL,
    
    FOREIGN KEY(id_usuario) REFERENCES usuario(id_usuario)
);

CREATE TABLE squad (
	id_squad INT PRIMARY KEY AUTO_INCREMENT,
	nome VARCHAR(255) NOT NULL,
	id_criador INT NOT NULL,
    
    FOREIGN KEY(id_criador) REFERENCES usuario(id_usuario)
);

CREATE TABLE squad_usuario(
	id_squadusuario INT PRIMARY KEY AUTO_INCREMENT,	
	id_squad INT NOT NULL,
    id_usuario INT NOT NULL,
    
	FOREIGN KEY(id_squad) REFERENCES squad(id_squad),
    FOREIGN KEY(id_usuario) REFERENCES usuario(id_usuario)   
);

CREATE TABLE tarefa (
	id_tarefa INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(255) NOT NULL,
    descricao TEXT NOT NULL,
    prazo DATE NOT NULL,
    hora_estimada INT,
    entregue BOOLEAN DEFAULT(false),    
    id_criador INT NOT NULL,
    id_projeto INT DEFAULT(null),
    
	FOREIGN KEY(id_criador) REFERENCES usuario(id_usuario),
    FOREIGN KEY(id_projeto) REFERENCES projeto(id_projeto)
);

CREATE TABLE squad_tarefa(
	id_squadtarefa INT PRIMARY KEY AUTO_INCREMENT,	
	id_squad INT NOT NULL,
    id_tarefa INT NOT NULL,
    
	FOREIGN KEY(id_squad) REFERENCES squad(id_squad),
    FOREIGN KEY(id_tarefa) REFERENCES tarefa(id_tarefa)   
);


CREATE TABLE usuario_tarefa (
	id_usuariotarefa INT PRIMARY KEY AUTO_INCREMENT,
	id_usuario INT NOT NULL,
    id_tarefa INT NOT NULL,
    
	FOREIGN KEY(id_usuario) REFERENCES usuario(id_usuario),
    FOREIGN KEY(id_tarefa) REFERENCES tarefa(id_tarefa)
);



-- ALTER TABLE timesheet ADD COLUMN data_ponto DATE NOT NULL;
SELECT * FROM timesheet;
SELECT * FROM usuario;
SELECT * FROM tarefa;
SELECT * FROM squad;
SELECT * FROM projeto;
SELECT * FROM usuario_tarefa;
SELECT * FROM timesheet;
SELECT * FROM usuario_tarefa JOIN tarefa on usuario_tarefa.id_tarefa = tarefa.id_tarefa where usuario_tarefa.id_usuariotarefa =1;
SELECT * FROM usuario_tarefa join tarefa on usuario_tarefa.id_tarefa = tarefa.id_tarefa;
SELECT * FROM cargo;



