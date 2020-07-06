import React, {useState} from 'react';
import Modal from '@material-ui/core/Modal';
import AssignmentTurnedInRoundedIcon from '@material-ui/icons/AssignmentTurnedInRounded';
import {makeStyles} from '@material-ui/core/styles';
import Input from '../../components/Input/Input';
import Botao from '../../components/Botao/Botao';
import InputData from '../../components/InputData/InputData'
import {format} from 'date-fns'
import api from '../../service/api';

const useStyles = makeStyles((theme)=>({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
  
}))


export default function Tarefa(){
    const [open,setOpen] = useState(false);
    const classes = useStyles();
    const [nome, setNome] = useState();
    const [entrega, setEntrega] = useState();
    const [descricao, setDescricao] = useState();

    const estilo = {
        input:[
            {marginRight:'55%',marginTop:'0px'},
        
        ],
        p:{
            color:'#FE963D',
            marginLeft:'2%',
            fontSize:'25px'
        },
    
        espacoCampo:{
            marginLeft:'2%',
            marginBottom:'5%'
        }
        
    }

    const handleOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      
      };
      
      function handlePreencher(evento,espaco){
        switch(espaco){
            case "nome":{
                setNome(evento.target.value);
                break;
            }
            case "descricao":{
                setDescricao(evento.target.value);
                break;
            }
            case "prazo":{
                setEntrega(evento);
                break;
            }
            default: 
                return 
        }
        
    }

    async function handleEnviar(x){
        x.preventDefault();
        
        let prazo =  format(new Date(entrega), "yyyy-MM-dd");
      
   
        
        let data = {
            nome,
            descricao,
            prazo,
        }
        console.log(data)
       
        const response = await api.post("/tarefa",data);

        if(response.status===200){
            console.log(response);
        } 
        
        handleClose();
      
    }
      const criarTarefa = (
        <div className="container3">
        <form className='forms' onSubmit={handleEnviar}>
            <div>
            <p style={estilo.p}>Nome da tarefa</p>
            </div>
            <h1 style={estilo.espacoCampo}><Input  width="45vw" variant="standard" funcao={(evento)=>handlePreencher(evento,"nome")}/></h1 >
            <div style={{display:'flex', flexDirection:'row', justifyContent:'space-between', flexWrap:'wrap'}} >
            <h1 style={estilo.espacoCampo}><InputData  style={estilo.input[0]} label="Entrega" value={entrega} funcao={(evento)=>handlePreencher(evento,"prazo")}/></h1 >
            </div>
            <div>
            <p style={estilo.p}>Descrição da tarefa</p>
            <h1  style={estilo.espacoCampo}><Input  multiline="false" width="35vw" funcao={(evento)=>handlePreencher(evento,"descricao")}/></h1 >
            </div>
            <h1 style={{textAlign:'center'}}><Botao type="submit" children="CONCLUIR" width="90px"></Botao></h1>
            
           
            
        </form>
    </div>
      )
    return(
        <div className="container">
            <p style={{color:'#FE963D',fontWeight:'bold',fontSize:'40px',marginRight:"18vw", marginTop:'20px'}}>Tarefas</p>
             <div style={{display:'flex', alignItems:'center'}} onClick={handleOpen}>
             
              <span style={{color:'#FE963D',cursor:'pointer',fontWeight:'bold', marginTop:'10px'}}><AssignmentTurnedInRoundedIcon style={{fontSize:'25px'}}/></span>
              <p style={{color:'#FE963D',marginRight:'18vw',cursor:'pointer',fontWeight:'bold', marginTop:'10px', fontSize:'20px'}}>
                Nova tarefa
              </p>
              </div>
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                className={classes.modal}
                >
                    {criarTarefa}
            </Modal>
        </div>
    )
}