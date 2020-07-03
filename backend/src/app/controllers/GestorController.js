import sendConfig from '../../config/sendgrid';
import authConfig from '../../config/auth';
import emailService from '../../lib/emailService';
import db from '../../database/connection';
import bcrypt from 'bcryptjs';
import md5 from 'md5';
import validaCpf from '../../utils/validaCpf';
import verificaSenha from '../../utils/verificaSenha';

class GestorController {
    async index(req, res) {
        const id_usuario = req.idUsuario;
        
        try {

           await db("usuario as U")
                .select([
                    "U.id_usuario", 
                    "U.nome",
                    "U.nome_social",
                    "U.email",
                    "U.cpf",
                    "U.id_tipousuario",
                    "C.id_cargo", 
                    "C.nome as cargo" 
                ])
                .join("cargo as C", { "U.id_cargo" : "C.id_cargo" })           
                .where({                    
                    "U.id_usuario" : id_usuario,
                })
                .first()
                .then((usuario) => {

                    if(usuario) {
                       return res.json(usuario);
                    }

                    return res.status(400).json({ mensagem: "Não foi possivel listar gestor!"});

                })
                .catch((error) => {
                    console.error("Error: ", error);

                    return res.status(400).json({ mensagem: "Erro ao listar usuário!" });
                });            
            
        } catch (error) {
            console.error("Error: ", error);

            return res.status(500).json({ mensagem: "Erro interno no servidor!" });
        }
    }

    async store(req, res) {
        const { nome, email, senha, confirmar_senha, cpf, id_cargo, nome_social} = req.body;
        
        if(!(nome && email && senha && confirmar_senha && cpf && id_cargo && nome_social)) {
            return res.status(400).json({ mensagem: "Dados obrigatórios não informados!" });
        }

        const cpfValido = validaCpf(cpf);

        if(!cpfValido.valido) {
            return res.status(400).json({ mensagem: "CPF Inválido!"});
        }
        
        try {
        
            const existeCpf = await db("usuario")
                .select("cpf")
                .where("usuario.cpf", cpfValido.cpfUsuario)
                .first();

            if(existeCpf) {
                return res.status(400).json({ mensagem: "CPF Já cadastrado!"});
            }

            const existeEmail = await db("usuario")
                .select("email")
                .where("usuario.email", email)
                .first();

            if(existeEmail) {
                return res.status(400).json({ mensagem: "E-mail Já cadastrado!"});
            }


            if(!(confirmar_senha === senha)) {
                return res.status(400).json({ mensagem: "Nova senha e confirmar senha não coincide!" });
            }

            const senha_hash = await bcrypt.hash(senha, 8);
        
            await db("usuario").insert({
                    nome,
                    nome_social,
                    email: email.toLowerCase(),
                    senha: senha_hash,
                    cpf: cpfValido.cpfUsuario,
                    codigo: md5(Math.random(0 * 999) + authConfig.SALT_KEY),
                    id_tipousuario: 2,
                    id_cargo,
                
                })
                .then((retorno) => {

                    if(retorno) {
                        emailService.send(
                            email, 
                            "Bem vindo ao InBoard", 
                            sendConfig.EMAIL_TMPL.replace('{0}', nome)
                        );

                        return res.json({ mensagem: "Cadastrado realizado com sucesso!" });
                    }

                    return res.status(400).json({ mensagem: "Não foi possível cadastrar gestor!" });

                })
                .catch((error) => {
                    console.error("Error: ", error);

                    return res.status(400).json({ mensagem: "Erro ao cadastrar usuário!" });
                });
            
        } catch (error) {
            console.error("Error: ", error);

            return res.status(500).json({ mensagem: "Erro interno no servidor!" });
        }       

    }

    async update(req, res) {
        const id_usuario = req.idUsuario;
        let { 
            nome,
            nome_social, 
            email, 
            senha_antiga, 
            nova_senha, 
            confirmar_senha, 
            cpf, 
            novo_cargo

        } = req.body;
        
        let senha_hash = null;

        nome = nome == "" || nome == undefined || nome == null ? undefined : nome;
        email = email == "" || email == undefined || email == null ? undefined : email;
        cpf = cpf == "" || cpf == undefined || cpf == null ? undefined : cpf
        novo_cargo = novo_cargo == "" || novo_cargo == undefined || novo_cargo == null ? undefined : novo_cargo;
        nova_senha = nova_senha == "" || nova_senha == undefined || nova_senha == null ? undefined : nova_senha;
        nome_social = nome_social == "" || nome_social == undefined || nome_social == null ? undefined : nome_social;

        try {

            const user = await db("usuario").select("*").where({ id_usuario }).first();

            if(!user) {
                return res.status(401).json({ mensagem: "Gestor não encontrado!" });
            }

            if(nova_senha) {

                if(!senha_antiga || !confirmar_senha) {
                    return res.status(400).json({ mensagem: "Senha antiga e confirmar senha são obrigatórios, caso queira mudar sua senha!" });                    
                }

                if(!(await verificaSenha(senha_antiga, user.senha))) {
                    return res.status(401).json({ mensagem: "Senha antiga incorreta!" });
                }

                if(!(nova_senha === confirmar_senha)) {
                    return res.status(400).json({ mensagem: "Nova senha e confirmar senha não coincide!" });
                }

                senha_hash = await bcrypt.hash(nova_senha, 8);

            }
            
            if(cpf) {

                cpf = validaCpf(cpf);
        
                if(!cpf.valido) {
                    return res.status(400).json({ mensagem: "CPF Inválido!"});
                }

                const existeCpf = await db("usuario")
                    .select("cpf")
                    .where("cpf", cpf.cpfUsuario)
                    .whereNotIn("id_usuario", [id_usuario])
                    .first();
    
                if(existeCpf) {
                    return res.status(400).json({ mensagem: "CPF Já cadastrado!"});
                }
            }

            if(email) {
                const existeEmail = await db("usuario")
                    .select("email")
                    .where("email", email)
                    .whereNotIn("id_usuario", [id_usuario])
                    .first();
    
                if(existeEmail) {
                    return res.status(400).json({ mensagem: "E-mail Já cadastrado!"});
                }

            }
        
            await db("usuario").update({
                        nome,
                        nome_social,
                        email: email ? email.toLowerCase() : email,
                        senha: senha_hash !== null ? senha_hash : user.senha,
                        cpf: cpf.cpfUsuario,
                        id_cargo: novo_cargo
                    
                    })
                    .where({
                        id_usuario
                    })
                    .then((retorno) => {

                        if(retorno) {
                            return res.json({ mensagem: "Dados alterados com sucesso!" });
                        }

                        return res.status(400).json({ mensagem: "Não foi possível alterar informações"});
                    })
                    .catch((error) => {
                        console.error("Error: ", error);

                        return res.status(400).json({ mensagem: "Erro ao alterar dados do usuário!" });
                    });                
           
            
        } catch (error) {
            console.error("Error: ", error);

            return res.status(500).json({ mensagem: "Erro interno no servidor!" });
        }
    }
}

export default new GestorController();