# Programação de Formação: Squad 2


## Tópicos:
* [Membros](#-Membros)
* [Tecnologias usadas](#-Tecnologias)
* [Como executar a aplicação](#-Como)

## Membros:
### UX
[Danilo Barberini](https://www.linkedin.com/in/danilo-barberini-ordine-974b3a116/)
### Devs
[Alef White](https://www.linkedin.com/in/alef-white-949223123/) - [GitHub](https://github.com/alefwhite)  
[Fábio Dantas](https://www.linkedin.com/in/fabio-dantas-da-cruz/) - [GitHub](https://github.com/FabioDantasCruz)  
[João Albuquerque](https://www.linkedin.com/in/joão-albuquerque-7bb562161/) - [GitHub](https://github.com/joaomarcos70)  
[Luiz Alberto Carvalho](https://www.linkedin.com/in/luiz-alberto-russo-carvalho-004003175/) - [GitHub](https://github.com/carvalhoLuiz/)  
## Nome do Projeto: InBoard

## Artigo:
 https://medium.com/@danilo.barberini/estudo-de-caso-ux-processo-de-elabora%C3%A7%C3%A3o-de-um-gerenciador-de-tarefas-e48952929c04
## Objetivo do Projeto:
 Projeto com foco na organização e melhoria do home office.

## Tecnologias usadas e dependências:
### Back-end:
* Node
* Knex (MySQL)
* Mongoose (MongoDB)
* SendGrid/Mail
* Bcrypt 
* MD5 
* JSONWebToken
* Moment
* Multer
* Cors

## Front-end
* Date-FNS
* Remask
* React-toastfy
* Axios
* Material ui
* React-router-dom
* React-image-crop
* React-infinite-scroll-component
* Material-Table
* React body movin

## Como executar aplicação:

    * git clone no repositório
    * Acessar na pasta da aplicação
    * Acessar a pasta banco de dados
    	* Executar script DDL (MySQL)
    	* Executar script DML (MySQL)
    * colocar.env na pasta do backend (disponivel no discord squad2 #links-2 
    para os recrutadores da fcamara) NÃO ESQUECER DE RENOMEAR PARA ".env"
    * Acessar a pasta backend
    * Colar o arquivo 
    	* Abrir o CMD na pasta
    	 
    $ npm install
    $ npm run dev
    
    * Acessar a pasta frontend
    * Abrir o CMD
     
    $ npm install
    $ npm start
 
 ## Como usar a aplicação
* Realizar o cadastro como gestor
* Convide um funcionário (para gerencia-lo na aplicação)
* Crie um projeto
* Crie uma squad
* Atribua um usuario a squad
* Atribua squad ao projeto
* Crie uma tarefa
* Atribua a tarefa a um usuario ou a squad ou a ambos
* Bata pontos
* Acesse como funcionario e veja as tarefas
