import db from '../../database/connection';
import verificaTipoUsuario from '../../utils/verificaTipoUsuario';
import formatarDataBr from '../../utils/formatarDataBr';
import NotificacaoSquadTarefa from '../models/NotificacaoSquadTarefa';

class SquadTarefaController {
    async index(req, res) {
        const id_usuario = req.idUsuario;        

        if(verificaTipoUsuario(req.tipoUsuario)) {
            return res.status(401).json({ mensagem: "Não autorizado!" });
        }       
       

        const existeSquad_E_Tarefa = await db("squad_tarefa as ST")
            .select([
                "ST.id_squadtarefa", 
                "S.nome as squad", 
                "P.nome as projeto", 
                "P.descricao as descricao_projeto", 
                "T.descricao as tarefa", 
                "T.prazo", 
                "T.hora_estimada"
            ])
            .distinct("ST.id_squadtarefa")
            .innerJoin("squad as S", "S.id_squad", "=", "ST.id_squad")
            .innerJoin("tarefa as T", "T.id_tarefa", "=", "ST.id_tarefa")
            .innerJoin("projeto as P", "P.id_projeto", "=", "T.id_projeto")      
            .where({
                "S.id_criador" : id_usuario,
                "T.id_criador" : id_usuario,
                "P.id_criador" : id_usuario
            })
            .orderBy("ST.id_squadtarefa", "desc");

        return res.json(existeSquad_E_Tarefa);
    }
    async store(req, res) {
        const id_usuario = req.idUsuario;
        const { id_squad, id_tarefa } = req.body;

        if(verificaTipoUsuario(req.tipoUsuario)) {
            return res.status(401).json({ mensagem: "Não autorizado!" });
        }

        try {

            const existeSquad_E_Tarefa = await db("usuario as U")
                .innerJoin("squad as S", "S.id_criador", "=", "U.id_usuario")
                .innerJoin("tarefa as T", "T.id_criador", "=", "U.id_usuario")
                .innerJoin("projeto as P", "P.id_criador", "=", "U.id_usuario")
                .select("S.nome as squad ", "T.descricao", "T.prazo", "P.nome")
                .where({
                    "S.id_squad"   : id_squad,
                    "S.id_criador" : id_usuario,
                    "T.id_tarefa"  : id_tarefa,
                    "T.id_criador" : id_usuario,
                    "P.id_criador" : id_usuario
                }).first();
                

            if(!existeSquad_E_Tarefa) {
                return res.status(400).json({ mensagem: "Squad e tarefa não encontrada!" });
            }        
            
            const existeSquadTarefa = await db("squad_tarefa").where({
                id_squad,
                id_tarefa,
            }).first();

            if(existeSquadTarefa) {
                return res.status(400).json({ mensagem: `A tarefa(${existeSquad_E_Tarefa.descricao}) já está adicionada para a squad(${existeSquad_E_Tarefa.squad}), você não pode adicionar novamente!`});
            }
   
            const formatter = new Intl.DateTimeFormat('pt-BR', {
                month: '2-digit',
                day: '2-digit',               
                year: 'numeric',
            });

            const prazo = formatarDataBr(formatter.format(existeSquad_E_Tarefa.prazo));            

            await db("squad_tarefa").insert({
                id_squad,
                id_tarefa
            })
            .then(async () => {

                await NotificacaoSquadTarefa.create({
                    conteudo: `Projeto(${existeSquad_E_Tarefa.nome}) recebeu uma nova tarefa(${existeSquad_E_Tarefa.descricao})\n Prazo ${prazo}`,
                    squad: id_squad,
                });

                return res.status(201).json({ 
                    mensagem: `A tarefa(${existeSquad_E_Tarefa.descricao}) foi adicionada para a squad(${existeSquad_E_Tarefa.squad}) com o prazo até ${prazo}.`
                });
            })
            .catch(() => {
                return res.status(400).json({ 
                    mensagem: `Não foi possível adicionar tarefa(${existeSquad_E_Tarefa.descricao}) para a squad(${existeSquad_E_Tarefa.squad}).`
                });
            });

        } catch (error) {
            return res.status(500).json({ mensagem: "Erro interno no servidor." });
        }
    }

    async update(req, res) {
        const id_usuario = req.idUsuario;
        const id_squadtarefa = req.params.id;
        const { id_squad, id_tarefa } = req.body;

        if(verificaTipoUsuario(req.tipoUsuario)) {
            return res.status(401).json({ mensagem: "Não autorizado!" });
        }

        try {

            const existeSquad_E_Tarefa = await db("usuario as U")
            .innerJoin("squad as S", "S.id_criador", "=", "U.id_usuario")
            .innerJoin("tarefa as T", "T.id_criador", "=", "U.id_usuario")
            .innerJoin("projeto as P", "P.id_criador", "=", "U.id_usuario")
            .select("S.nome as squad ", "T.descricao", "T.prazo", "P.nome")
            .where({
                "S.id_squad"   : id_squad,
                "S.id_criador" : id_usuario,
                "T.id_tarefa"  : id_tarefa,
                "T.id_criador" : id_usuario,
                "P.id_criador" : id_usuario
            }).first();
            

            if(!existeSquad_E_Tarefa) {
                return res.status(400).json({ mensagem: "Squad e tarefa não encontrada!" });
            }        
        
            const existeSquadTarefa = await db("squad_tarefa").where({
                id_squad,
                id_tarefa,
            }).first();

            if(existeSquadTarefa) {
                return res.status(400).json({ mensagem: `A tarefa(${existeSquad_E_Tarefa.descricao}) já está adicionada para a squad(${existeSquad_E_Tarefa.squad}), você não pode adicionar novamente!`});
            }
            
            const formatter = new Intl.DateTimeFormat('pt-BR', {
                month: '2-digit',
                day: '2-digit',               
                year: 'numeric',
            });

            const prazo = formatarDataBr(formatter.format(existeSquad_E_Tarefa.prazo));
            
            await db("squad_tarefa").where({ id_squadtarefa }).update({
                id_squad,
                id_tarefa
            })
            .then(async () => {

                await NotificacaoSquadTarefa.create({
                    conteudo: `Projeto(${existeSquad_E_Tarefa.nome}) recebeu uma nova tarefa(${existeSquad_E_Tarefa.descricao})\n Prazo ${prazo} - teste`,
                    squad: id_squad,
                });

                return res.status(200).json({ 
                    mensagem: `A tarefa(${existeSquad_E_Tarefa.descricao}) foi editada e adicionada para a squad(${existeSquad_E_Tarefa.squad}) com o prazo até ${prazo}.`
                });
            })
            .catch(() => {
                return res.status(400).json({ 
                    mensagem: `Não foi possível editar a tarefa(${existeSquad_E_Tarefa.descricao}) para a squad(${existeSquad_E_Tarefa.squad}).`
                });
            });

        } catch (error) {
            return res.status(500).json({ mensagem: "Erro interno no servidor." });
        }
    }

    async delete(req, res) {
        const id_usuario = req.idUsuario;
        const id_squadtarefa = req.params.id;       

        if(verificaTipoUsuario(req.tipoUsuario)) {
            return res.status(401).json({ mensagem: "Não autorizado!" });
        }

        try { 

            const squad_tarefa = await db("squad_tarefa")
                .where({ id_squadtarefa })
                .first();

                
            if(!(squad_tarefa)) {
                return res.status(400).json({ mensagem: "Squad/Tarefa não encontrada" });
            }    

            const { id_squad, id_tarefa } = squad_tarefa;

            const existeSquad_E_Tarefa = await db("usuario as U")
                .innerJoin("squad as S", "S.id_criador", "=", "U.id_usuario")
                .innerJoin("tarefa as T", "T.id_criador", "=", "U.id_usuario")
                .innerJoin("projeto as P", "P.id_criador", "=", "U.id_usuario")
                .select("S.nome as squad ", "T.descricao", "T.prazo", "P.nome")
                .where({
                    "S.id_squad"   : id_squad,
                    "S.id_criador" : id_usuario,
                    "T.id_tarefa"  : id_tarefa,
                    "T.id_criador" : id_usuario,
                    "P.id_criador" : id_usuario
                }).first();
            

            if(!existeSquad_E_Tarefa) {
                return res.status(400).json({ mensagem: "Squad/tarefa não encontrada!" });
            } 

            await db("squad_tarefa")
                .where({ id_squadtarefa })
                .delete()
                .then(() => {                
                    return res.status(200).json({ 
                        mensagem: `A tarefa(${existeSquad_E_Tarefa.descricao}) foi excluida da squad(${existeSquad_E_Tarefa.squad}).`
                    });
                })
                .catch(() => {
                    return res.status(400).json({ 
                        mensagem: `Não foi possível excluir a tarefa(${existeSquad_E_Tarefa.descricao}) para a squad(${existeSquad_E_Tarefa.squad}).`
                    });
                });

        } catch (error) {
            console.error(error);
            return res.status(500).json({ mensagem: "Erro interno no servidor." });
        }
    }
}

export default new SquadTarefaController();