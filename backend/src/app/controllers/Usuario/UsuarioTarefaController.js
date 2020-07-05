import db from '../../../database/connection';
import NotificacaoUsuarioTarefa from '../../models/NotificacaoUsuarioTarefa';
import formatarDataBr from '../../../utils/formatarDataBr';

class UsuarioTarefaController {
/*****************************************************************************************
 Classe responsavel por relacionar tarefas aos usuarios.
 Método store é responsavel por relacionar tarefa ao usuario.
 Método update é responsavel por alterar a relação do usuario a terefa.
 Método delete é responsavel por apagar a relação entre o usuario e a tarefa.
 Método index é responsavel por retornar as tarefas relacionadas ao usuario.
 Os parametros req(requisiçao) e res(resposta).
******************************************************************************************/

    async store(req,res){
        const { id_usuario, id_tarefa } = req.body;
        const id_criador = req.idUsuario;
        
        try {

            const existeUsuario = await db("usuario").select("*")
                .where({ 
                    id_usuario,
                    id_criador 
                })
                .first();
    
            if(!existeUsuario){
                return res.status(400).json({ mensagem: "Usuario inexistente" });
            }
         
            const existeTarefa = await db("tarefa")
                .select("*")
                .where({id_tarefa})
                .andWhere({id_criador}).first();
           
            if(!existeTarefa){
               return res.status(400).json({ mensagem: "Tarefa inexistente" });
            }

            const existeUsuarioTarefa = await db("usuario_tarefa").where({
                id_usuario,
                id_tarefa
            }).first();

            if(existeUsuarioTarefa) {
                return res.status(400).json(
                    { mensagem: 
                        `A tarefa(${existeTarefa.nome}) já está adicionada ao (${existeUsuario.nome}), você não pode adicionar novamente!`
                    });
            }

            const formatter = new Intl.DateTimeFormat('pt-BR', {
                month: '2-digit',
                day: '2-digit',               
                year: 'numeric',
            });

            const prazo = formatarDataBr(formatter.format(existeTarefa.prazo));

            await db("usuario_tarefa").insert({
                id_usuario,
                id_tarefa
            })
            .then(async (retorno) => {

                if(retorno) {
                    await NotificacaoUsuarioTarefa.create({
                        conteudo: `Você recebeu uma nova tarefa(${existeTarefa.nome}) com o prazo até ${prazo}`,
                        user: id_usuario,
                        id_criador
                    });
    
                    return res.json({ mensagem: `A tarefa(${existeTarefa.nome}) foi atribuida ao funcionário(${existeUsuario.nome}) com sucesso!`});
                }

                return res.status(400).json({ mensagem: "Não foi possível atribuir tarefa!" });
            })
            .catch((error) => {
                console.error("Error: ", error);

                return res.status(400).json({ mensagem: "Erro ao atribuir tarefa!" });
            });
           
        }
        catch{
            return res.status(500).json({ mensagem:"Erro no servidor!" });
        }
    }
   
    async update(req,res){
        const id_usuariotarefa = req.params.id;
        let { id_tarefa, id_usuario } = req.body;
        let existeTarefa = null;
        const idCriador = req.idUsuario;
        
        // tratamento caso o campo venha vazio
        id_tarefa = id_tarefa == "" ? undefined : id_tarefa;
        id_usuario = id_usuario == "" ? undefined : id_usuario;       

        try {

            const existeUsuario = await db("usuario").select("*")
            .where({ 
                id_usuario,
                id_criador: req.idUsuario 
            })
            .first();

            if(!existeUsuario){
                return res.status(400).json({ mensagem: "Usuario inexistente" });
            }
            
            if(id_tarefa != undefined){ 

                existeTarefa = await db("tarefa").select("*").where({
                    id_tarefa,
                    id_criador : idCriador
                }).first();
    
                if(!existeTarefa){
                    return res.status(400).json({ mesangem: "Tarefa inexistente" });
                }
            }
            
            const verificaCriador = await db("usuario_tarefa")
                .select("*")
                .join("tarefa","usuario_tarefa.id_tarefa","=","tarefa.id_tarefa")
                .where("usuario_tarefa.id_usuariotarefa", id_usuariotarefa).first();
    
            if(verificaCriador.id_criador != idCriador){
                return res.status(400).json( { mensagem: "Id do criador diferente" });
            }

            const existeUsuarioTarefa = await db("usuario_tarefa").where({
                id_usuario,
                id_tarefa
            }).first();

            if(existeUsuarioTarefa) {
                return res.status(400).json(
                    { mensagem: 
                        `A tarefa(${existeTarefa.nome}) já está adicionada ao (${existeUsuario.nome}), você não pode adicionar novamente!`
                    });
            }

            const formatter = new Intl.DateTimeFormat('pt-BR', {
                month: '2-digit',
                day: '2-digit',               
                year: 'numeric',
            });

            const prazo = formatarDataBr(formatter.format(existeTarefa.prazo));

            await db("usuario_tarefa")
                .where({ id_usuariotarefa })
                .update({ id_tarefa, id_usuario })
                .then(async (retorno) => {

                    if(retorno) {
                        await NotificacaoUsuarioTarefa.create({
                            conteudo: `Você recebeu uma nova tarefa(${existeTarefa.nome}) com o prazo até ${prazo}`,
                            user: id_usuario,
                            id_criador
                        });
        
                        return res.json({ mensagem: "A tarefa editada foi atribuida ao usuario com sucesso!" });
                    }

                    return res.status(400).json({ mensagem: "Não foi possível atribuir a tarefa!" });
                })
                .catch((error) => {
                    console.error("Error: ", error);

                    return res.status(400).json({ mensagem: "Erro ao editar tarefa atribuida!" });
                });

        } catch(error) {
            console.error("Error: ", error);

            return res.json({ mensagem:"Erro interno servidor!" });
        }
    }
    
    async delete(req,res){
        const id_usuariotarefa = req.params.id;
        const id_criador = req.idUsuario;
        
        try {
            const verificaCriador = await db("usuario_tarefa")
                .select("*")
                .join("tarefa","usuario_tarefa.id_tarefa","=","tarefa.id_tarefa")
                .where("usuario_tarefa.id_usuariotarefa", id_usuariotarefa)
                .first();
            
            if(verificaCriador.id_criador != id_criador){
                return res.status(400).json({ mensagem: "Tarefa inexistente" });
            }
            
            const verificaUsuarioTarefa = await db("usuario_tarefa")
                .select("*")
                .where({id_usuariotarefa})
                .first();
            
            if(!verificaUsuarioTarefa){
                return res.status(400).json({ mensagem: "Tarefa inexistente!" });
            }

            await db("usuario_tarefa").where({id_usuariotarefa})
                .delete()
                .then((retorno) => {
                    
                    if(retorno) {
                        return res.json({ mensagem: "Tarefa deletada com sucesso!" });
                    }

                    return res.status(400).json({ mensagem: "Não foi possível deletar a tarefa!" });

                })
                .catch((error) => {
                    console.error("Error: ", error);

                    return res.status(400).json({ mensagem: "Erro ao deletar tarefa do usuario!" });
                }); 

        } catch(error) {
            console.error("Error: ", error);

            return res.status(500).json({ mensagem: "Erro interno no servidor!" });
        }
    }

    async index(req,res){
        const idUsuario = req.idUsuario;
        const { nome, entregue = 0} = req.body;

        try{
           await db("usuario_tarefa")
            .select(
                "usuario_tarefa.id_usuariotarefa",
                "tarefa.nome",
                "tarefa.descricao",
                "tarefa.prazo",
                "tarefa.hora_estimada",
                {"nome_projeto":"projeto.nome"},
                "tarefa.entregue",
                {"funcionario":"usuario.nome"}
            )
            .join("tarefa","usuario_tarefa.id_tarefa","=","tarefa.id_tarefa")
            .join("projeto","tarefa.id_projeto","=","projeto.id_projeto")
            .join("usuario","usuario_tarefa.id_usuario", "=", "usuario.id_usuario")
            .where("usuario_tarefa.id_usuario", idUsuario)
            .orWhere("tarefa.id_criador", idUsuario)
            .andWhere("tarefa.entregue", entregue)
            //.andWhere("tarefa.nome","like",`%${nome}%`);
            .then((usuarioTarefa) => {

                if(usuarioTarefa) {
                    return res.json(usuarioTarefa);
                }

                return res.status(400).json({ mensagem: "Não foi possível listar usuario/tarefa!"});
            })
            .catch((error) => {
                console.error("Erro: ", error);

                return res.status(400).json({ mensagem: "Erro ao listar usuário/tarefa!"});
            });

        } catch(error) {
            console.error("Error: ", error);

            return res.status(500).json({ mensagem: "Erro interno no servidor!" });
        }
    }
}

    

export default new UsuarioTarefaController();