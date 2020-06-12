import db from '../../database/connection';

class SquadUsuarioontroller {
    async index(req, res) {
        const id_usuario = req.idUsuario;
        const tipoUsuario = req.tipoUsuario;

        if(tipoUsuario === 3) {
            return res.status(401).json({ error: "Não autorizado!"});
        }

        try {
           const usuarioSquad = await db("squad_usuario")
            .select("squad_usuario.id_squadusuario", "usuario.nome as nome", "squad.nome as squad")
            .join("usuario", { "usuario.id_usuario" : "squad_usuario.id_usuario" })
            .join("squad", { "squad.id_squad" :  "squad_usuario.id_squad" })
            .where({                    
                "usuario.id_status"  : 1,
                "usuario.id_criador" : id_usuario,
                "squad.id_criador"   : id_usuario
            })
            .orderBy("squad_usuario.id_squadusuario", "desc");       

            if(usuarioSquad) {
                return res.json(usuarioSquad);
            }
            
        } catch (error) {
            return res.status(500).json({error: "Erro interno no servidor."});            
        }            

    }

    async store(req, res) {
        const tipoUsuario = req.tipoUsuario;
        const gestorId = req.idUsuario;
        const { id_squad, id_usuario } = req.body;

        if(tipoUsuario === 3) {
            return res.status(401).json({ error: "Não autorizado!"});
        }
        
        if(!(id_squad && id_usuario)) {
            return res.status(400).json({ error: "Squad e usuário são obrigatórios!"});
        }

        try {
            // verifica se o usuário já pertence a squad que foi passada
            const usuarioPertenceSquad = await db("squad_usuario")
                .select("usuario.nome as nome", "squad.nome as squad")
                .join("usuario", { "usuario.id_usuario" : "squad_usuario.id_usuario" })
                .join("squad", { "squad.id_squad" :  "squad_usuario.id_squad" })
                .where({
                    "squad_usuario.id_squad" : id_squad,
                    "squad_usuario.id_usuario" : id_usuario
                })
                .first();
            
            if(usuarioPertenceSquad) {
                return res.status(400).json({ 
                    mensagem: 
                        `O funcionário ${usuarioPertenceSquad.nome} já pertence a squad ${usuarioPertenceSquad.squad}.`
                });
            }

            const squadUsuarioPertenceGestor = await db("usuario as U")
                .select("*")
                .join("usuario", {"usuario.id_criador" :  "U.id_usuario" })
                .join("squad", { "squad.id_criador" : "U.id_usuario" })
                .where({
                    "squad.id_criador" : gestorId,
                    "usuario.id_criador" : gestorId,
                    "squad.id_squad" : id_squad,
                    "usuario.id_usuario" : id_usuario
                }).first();


            if(!squadUsuarioPertenceGestor) {
                return res.status(400).json({ mensagem: "Usuário ou squad não encontrados!" });
            }
            
                
            await db("squad_usuario").insert({
                id_squad,
                id_usuario
            }).then(() => {
                return res.json({ mensagem: "Usuário foi incluindo a squad com sucesso!"});
            })
            .catch(() => {
                return res.status(400).json({ mensagem: "Erro ao inlcuir usuário a squad!"});
            });
            
            
        } catch (error) {
            return res.status(500).json({ error: "Erro interno no servidor!" });
        }

    }

    async update(req, res) {
        const tipoUsuario = req.tipoUsuario;
        const gestorId = req.idUsuario;
        const id_squadUsuario = req.params.id;        

        const { id_squad, id_usuario } = req.body;

        if(tipoUsuario === 3) {
            return res.status(401).json({ mensagem: "Não autorizado!"});
        }
        
        if(!(id_squad && id_usuario)) {
            return res.status(400).json({ mensagem: "Squad e usuário são obrigatórios!"});
        }

        try {

            const existeUsuarioSquad = await db("squad_usuario")
            .select("*")        
            .where("squad_usuario.id_squadusuario", id_squadUsuario)
            .first();

            if(!existeUsuarioSquad) {
                return res.status(400).json({ mensagem: "Usuário/Squad não encontrado!" });
            }

            // verifica se o usuário já pertence a squad que foi passada
            const usuarioPertenceSquad = await db("squad_usuario")
                .select("usuario.nome as nome", "squad.nome as squad")
                .join("usuario", { "usuario.id_usuario" : "squad_usuario.id_usuario" })
                .join("squad", { "squad.id_squad" :  "squad_usuario.id_squad" })
                .where({
                    "squad_usuario.id_squad" : id_squad,
                    "squad_usuario.id_usuario" : id_usuario
                })
                .first();
        
            if(usuarioPertenceSquad) {
                return res.status(400).json({ 
                    mensagem: 
                        `O funcionário ${usuarioPertenceSquad.nome} já pertence a squad ${usuarioPertenceSquad.squad}.`
                });
            }

            const squadUsuarioPertenceGestor = await db("usuario as U")
                .select("*")
                .join("usuario", {"usuario.id_criador" :  "U.id_usuario" })
                .join("squad", { "squad.id_criador" : "U.id_usuario" })
                .where({
                    "squad.id_criador" : gestorId,
                    "usuario.id_criador" : gestorId,
                    "squad.id_squad" : id_squad,
                    "usuario.id_usuario" : id_usuario
                }).first();


            if(!squadUsuarioPertenceGestor) {
                return res.status(400).json({ mensagem: "Usuário ou squad não encontrados!" });
            }
        
            await db('squad_usuario')
                .where("squad_usuario.id_squadusuario", id_squadUsuario)
                .update({
                    id_squad,
                    id_usuario
                })
                .then(() => {
                    return res.json({ mensagem: "Alteração realizada com sucesso!" });
                })
                .catch(() => {
                    return res.status(400).json({ mensagem: "Erro ao realizar alteração!" });
                });
            
        } catch (error) {
            return res.status(500).json({ error: "Erro interno no servidor." });
        }

    }

    async delete(req, res) {
        const gestorId = req.idUsuario;
        const tipoUsuario = req.tipoUsuario;
        const id_squadusuario = req.params.id;

        if(tipoUsuario === 3) {
            return res.status(401).json({ mensagem: "Não autorizado!" });
        }
        
        try {

            const existeSquadUsuario = await db("squad_usuario").
                where({
                    id_squadusuario
                })
                .first();

            if(!existeSquadUsuario) {
                return res.status(400).json({ mensagem: "Squad/Usuário não econtrado!" });
            }   

            const { id_squad, id_usuario } = existeSquadUsuario;
            
            const squadUsuarioPertenceGestor = await db("usuario as U")
                .select("*")
                .join("usuario", {"usuario.id_criador" :  "U.id_usuario" })
                .join("squad", { "squad.id_criador" : "U.id_usuario" })
                .where({
                    "squad.id_criador" : gestorId,
                    "usuario.id_criador" : gestorId,
                    "squad.id_squad" : id_squad,
                    "usuario.id_usuario" : id_usuario
                }).first();


            if(!squadUsuarioPertenceGestor) {
                return res.status(400).json({ mensagem: "Usuário ou squad não encontrados!" });
            }

            await db("squad_usuario")
                .where("squad_usuario.id_squadusuario", id_squadusuario)
                .delete()
                .then(() => {
                    return res.json({ mensagem: "Squad/Usuario deletado com sucesso!" });
                })
                .catch(() => {
                    return res.status(400).json({ mensagem: "Erro ao deletar Squad/Usuario!" });
                });            

        } catch (error) {
                return res.status(500).json({ error: "Erro interno no servidor." }); 
        }
    }
}

export default new SquadUsuarioontroller();