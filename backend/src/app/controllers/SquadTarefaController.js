import db from '../../database/connection';
import verificaTipoUsuario from '../../utils/verificaTipoUsuario';
import formatarDataBr from '../../utils/formatarDataBr';
import NotificacaoSquadTarefa from '../models/NotificacaoSquadTarefa';

class SquadTarefaController {
    async store(req, res) {
        const id_usuario = req.idUsuario;
        const { id_squad, id_tarefa } = req.body;

        try {

            if(verificaTipoUsuario(req.tipoUsuario)) {
                return res.status(401).json({ mensagem: "Não autorizado!" });
            }

            const existeSquad_E_Tarefa = await db("usuario")
                .join("squad as S")
                .join("tarefa as F")
                .join("projeto as P")
                .select("S.nome as squad ", "F.descricao", "F.prazo", "P.nome")
                .where({
                    "S.id_squad"   : id_squad,
                    "S.id_criador" : id_usuario,
                    "F.id_tarefa"  : id_tarefa,
                    "F.id_criador" : id_usuario,
                    "P.id_criador" : id_usuario
                })
                .first();             

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

            const existeSquad_E_Tarefa = await db("usuario")
                .join("squad as S")
                .join("tarefa as F")
                .join("projeto as P")
                .select("S.nome as squad ", "F.descricao", "F.prazo", "P.nome")
                .where({
                    "S.id_squad"   : id_squad,
                    "S.id_criador" : id_usuario,
                    "F.id_tarefa"  : id_tarefa,
                    "F.id_criador" : id_usuario,
                    "P.id_criador" : id_usuario
                })
                .first();

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
                
            const existeSquad_E_Tarefa = await db("usuario")
                .innerJoin("squad as S")
                .innerJoin("tarefa as F")
                .innerJoin("projeto as P")
                .select("S.nome as squad ", "F.descricao", "F.prazo", "P.nome")
                .where({              
                    "S.id_squad"   : id_squad,
                    "S.id_criador" : id_usuario,
                    "F.id_tarefa"  : id_tarefa,
                    "F.id_criador" : id_usuario,
                    "P.id_criador" : id_usuario
                })
                .first();
            

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