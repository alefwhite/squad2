import db from '../../../database/connection';

class SquadUsuarioController {
    async index(req, res) {
        const id_usuario = req.idUsuario;              

        try {

           await db("squad_usuario")
            .select([
                "squad_usuario.id_squadusuario", 
                "usuario.nome as nome", 
                "squad.nome as squad",
                "squad.id_squad",
                "usuario.id_usuario"
            ])
            .join("usuario", { "usuario.id_usuario" : "squad_usuario.id_usuario" })
            .join("squad", { "squad.id_squad" :  "squad_usuario.id_squad" })
            .where({                    
                "usuario.id_status"  : 1,
                "usuario.id_criador" : id_usuario,
                "squad.id_criador"   : id_usuario
            })
            .orderBy("squad_usuario.id_squadusuario", "desc")
            .then((usuarioSquad) => {

                if(usuarioSquad) {
                    return res.json(usuarioSquad);
                }

                return res.status(400).json({ mensagem: "Não foi possível listar squad/usuario" });

            })
            .catch((error) => {
                console.error("Error: ", error);

                return res.status(400).json({ mensagem: "Erro listar squad usuario."});
            });    

            
        } catch (error) {
            console.error("Error: ", error);

            return res.status(500).json({ mensagem: "Erro interno no servidor." });            
        }            

    }

    async store(req, res) {
        const gestorId = req.idUsuario;
        const { id_squad, id_usuario } = req.body;
       
        
        if(!(id_squad && id_usuario)) {
            return res.status(400).json({ mensagem: "Squad e usuário são obrigatórios!"});
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
            }).then((retorno) => {

                if(retorno) {
                    return res.json({ mensagem: "Usuário foi incluindo a squad com sucesso!"});
                }

                return res.status(400).json({ mensagem: "Não foi possível incluir usuário a squad!"});

            })
            .catch((error) => {
                console.error("Error: ", error);

                return res.status(400).json({ mensagem: "Erro ao inlcuir usuário a squad!"});
            });
            
            
        } catch (error) {
            console.error("Error: ", error);

            return res.status(500).json({ mensagem: "Erro interno no servidor!" });
        }

    }

    async update(req, res) {
        const gestorId = req.idUsuario;
        const id_squadUsuario = req.params.id;        

        const { id_squad, id_usuario } = req.body;
               
        
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
                .then((retorno) => {

                    if(retorno) {
                        return res.json({ mensagem: "Alteração realizada com sucesso!" });
                    }

                    return res.status(400).json({ mensagem: "Não foi possível alterar squad/usuario!" });
                })
                .catch((error) => {
                    console.error("Error: ", error);

                    return res.status(400).json({ mensagem: "Erro ao realizar alteração!" });
                });
            
        } catch (error) {
            console.error("Error: ", error);

            return res.status(500).json({ mensagem: "Erro interno no servidor." });
        }

    }

    async delete(req, res) {
        const gestorId = req.idUsuario;
        const id_squadusuario = req.params.id;
        
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
                .then((retorno) => {

                    if(retorno) {
                        return res.json({ mensagem: "Squad/Usuario deletado com sucesso!" });
                    }

                    return res.status(400).json({ mensagem: "Não foi possível deletar Squad/Usuario!" });
                })
                .catch((error) => {
                    console.error("Error: ", error);

                    return res.status(400).json({ mensagem: "Erro ao deletar Squad/Usuario!" });
                });            

        } catch(error) {
            console.error("Error: ", error);

            return res.status(500).json({ mensagem: "Erro interno no servidor." }); 
        }
    }
}

export default new SquadUsuarioController();