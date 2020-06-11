import db from '../../database/connection';
import verificaTipoUsuario from '../../utils/verificaTipoUsuario';
import formatarDataBr from '../../utils/formatarDataBr';
import NotificacaoSquadTarefa from '../models/NotificacaoSquadTarefa';

class SquadTarefaController {
    async store(req, res) {
        const id_usuario = req.idUsuario;
        const { id_squad, id_tarefa } = req.body;

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
      
        console.log(existeSquad_E_Tarefa);

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

        try {
            const formatter = new Intl.DateTimeFormat('pt-BR', {
                month: '2-digit',
                day: '2-digit',               
                year: 'numeric',
            });

            const prazo = formatarDataBr(formatter.format(existeSquad_E_Tarefa.prazo));
            
            console.log(prazo);

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
            return res.status(500).json({error: "Erro interno no servidor."});
        }
    }
}

export default new SquadTarefaController();