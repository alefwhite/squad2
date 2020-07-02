import db from '../../database/connection';
import IntlFormatDate from '../../utils/IntlFormatDate';
import IntlFormatTime from '../../utils/IntlFormatTime';
import formatarDataBr from '../../utils/formatarDataBr';
import moment from 'moment';

class TimesheetController {
    async index(req, res) {
        const id_usuario = req.idUsuario;
     
        try {
            const validaTimesheet = await db("timesheet")
                .where({    
                    id_usuario
                });               
            
                if(validaTimesheet) {
                    return res.json(validaTimesheet);
                } else {
                    return res.status(400).json({ mensagem: "Não foi possível listar o timesheet!"});
                }

        } catch (error) {
            console.log("Error: ", error);

            return res.status(500).json({ mensagem: "Erro interno no servidor!"});
        }


    }

    async store(req, res) {
        const id_usuario = req.idUsuario;
        const data_ponto = IntlFormatDate(new Date());
        const entrada = IntlFormatTime(new Date());
       
        try {

            const validaTimesheet = await db("timesheet")
                .where({
                    data_ponto,
                    id_usuario
                })
                .whereNotNull("entrada").first();

           
            if(validaTimesheet) {
                return res.status(200).json({ mensagem: "O apontamento da entrada já foi realizado!"});
            }    

            await db("timesheet").insert({
                data_ponto,
                entrada,
                id_usuario
            })
            .then((retorno) => {

                if(retorno) {
                    return res.json({ mensagem: `Apontamento - (Data: ${formatarDataBr(data_ponto)} - Entrada: ${ moment(entrada, "HH:mm:ss").format("HH:mm:ss")})` });
                }

                return res.status(400).json({ mensagem: "Não foi possível iniciar o timesheet!"});
            })
            .catch((error) => {
                console.error("Error: ", error);

                return res.status(400).json({ mensagem: "Erro ao iniciar o timesheet!"});
            });
            
        } catch (error) {
            console.error("Error: ", error);

            return res.status(500).json({ mensagem: "Erro interno no servidor!" });
        }        
    }

    async update(req, res) {
        const id_usuario = req.idUsuario;
        const data_ponto = IntlFormatDate(new Date());
       
        try {

            let validaTimesheet = await db("timesheet")
                .where({
                    data_ponto,
                    id_usuario
                })
                .whereNotNull("entrada")
                .first();
            
                
            if(!validaTimesheet) {
                return res.status(400).json({ mensagem: "O timesheet ainda não foi iniciado!"});
            }    
            
            if( moment(IntlFormatDate(new Date())) > moment(validaTimesheet.data_ponto) ) {
                await db("timesheet")
                    .update({
                        saida: "23:59:00"
                    })
                    .where({
                        data_ponto: validaTimesheet.data_ponto,
                        id_usuario
                    })

                
                return res.status(400).json({
                    mensagem: `O apontamento da saída poder ser feito até às 23:59:00 do dia: ${formatarDataBr(IntlFormatDate(validaTimesheet.data_ponto))},
                    se sua saída ultrapassou, será contabilizado hora extra apenas até 23:59:00, 
                    se ainda estiver trabalhando inicie um novo apontamento! 
                    `
                })
            }
                
                
            if(!validaTimesheet.almoco_ida && validaTimesheet.entrada) {
                const almoco_ida = IntlFormatTime(new Date());

                const retorno = await db("timesheet").update({
                    almoco_ida
                })
                .where({
                    data_ponto,
                    id_usuario
                });
                
                if(retorno) {
                    return res.json({ mensagem: 
                        `Apontamento - (Data: ${formatarDataBr(data_ponto)} - Almoço Ida: ${almoco_ida})` 
                    });
                } else {
                    return res.status(400).json({ mensagem: "Erro no apontamento do almoço!"});
                }

            } else if(!validaTimesheet.almoco_volta && validaTimesheet.almoco_ida && validaTimesheet.entrada) {
                const almoco_volta = IntlFormatTime(new Date());

                const retorno = await db("timesheet").update({
                    almoco_volta
                })
                .where({
                    data_ponto,
                    id_usuario
                });
                
                if(retorno) {
                    return res.json({ mensagem: 
                        `Apontamento - (Data: ${formatarDataBr(data_ponto)} - Almoço Volta: ${almoco_volta})` 
                    });
                } else {
                    return res.status(400).json({ mensagem: "Erro no apontamento da volta do almoço!"});
                }


            } else if(!validaTimesheet.saida && validaTimesheet.almoco_volta && 
                validaTimesheet.almoco_ida && validaTimesheet.entrada
                ){                 
               
                const saida = "15:01:00"//IntlFormatTime(new Date());
                
                let hora_extra = 0;
                let hora_negativa = 0;

                let calc_horas = moment(saida, "HH:mm:ss").subtract(validaTimesheet.entrada, "HH:mm:ss");
                let diferenca =  moment("09:00:00", "HH:mm:ss");               
                let horario = moment.duration(diferenca.diff(calc_horas));  

                let hora = horario._data.hours
                let minuto = horario._data.minutes;
                console.log("HORA: ", hora);
                console.log("Minuto: ", minuto);

                if(hora < 0 || minuto < 0) {

                    hora_extra = `${hora < 0 ? hora * -1 : hora}:${minuto < 0 ? minuto * -1 : minuto}:00`;
                    hora_extra =  moment(hora_extra, "HH:mm:ss").format("HH:mm:ss")
                    console.log("Extra: ", hora_extra);

                } else if(hora > 0 || minuto > 0) {

                    hora_negativa = `${hora < 0 ? hora * -1 : hora}:${minuto < 0 ? minuto * -1 : minuto}:00`;
                    hora_negativa = moment(hora_negativa, "HH:mm:ss").format("HH:mm:ss")
                    console.log("Negativa: ", hora_negativa);
                }   
             
                const retorno = await db("timesheet").update({
                    saida,
                    hora_extra,
                    hora_negativa
                })
                .where({
                    data_ponto,
                    id_usuario
                });
                
                if(retorno) {
                    return res.json({ mensagem: 
                        `Apontamento - (Data: ${formatarDataBr(data_ponto)} - Saída: ${ moment(saida, "HH:mm:ss").format("HH:mm:ss")})` 
                    });
                } else {
                    return res.status(400).json({ mensagem: "Erro no apontamento da saída!"});
                }
            
            } else {

                return res.status(400).json({ mensagem: `Você já fez todos os apontamentos do dia ${formatarDataBr(data_ponto)}.`});
            }  

            
        } catch (error) {
            console.error("Error: ", error);

            return res.status(500).json({ mensagem: "Erro interno no servidor!" });
        }        
    }
   
}

export default new TimesheetController();