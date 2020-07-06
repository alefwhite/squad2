import React, {useState, useEffect} from 'react';
import Modal from '@material-ui/core/Modal';
import AssignmentTurnedInRoundedIcon from '@material-ui/icons/AssignmentTurnedInRounded';
import {makeStyles} from '@material-ui/core/styles';
import Input from '../../components/Input/Input';
import Botao from '../../components/Botao/Botao';
import InputData from '../../components/InputData/InputData'
import {format} from 'date-fns'
import api from '../../service/api';
import {Card} from '@material-ui/core/';
import CardContent from '@material-ui/core/CardContent';
import CreateRoundedIcon from '@material-ui/icons/CreateRounded';
import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded';
import PersonAddRoundedIcon from '@material-ui/icons/PersonAddRounded';
import PeopleAltRoundedIcon from '@material-ui/icons/PeopleAltRounded';

const useStyles = makeStyles((theme)=>({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
  
}))


export default function Tarefa(){
    const [open,setOpen] = useState(false);
    const [open2, setOpen2] = useState(false); 
    const classes = useStyles();
    const [nome, setNome] = useState();
    const [entrega, setEntrega] = useState(new Date());
    const [descricao, setDescricao] = useState();
    const [tarefas, setTarefas] = useState([]);

    useEffect(()=>{
        buscarTarefa();
    },[])

    const buscarTarefa = () => { 
        api.get('/tarefa')
        .then(response => {
            setTarefas(response.data);
            console.log(response.data);
        })
    }

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
        console.log(prazo);
   
        
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
        
        buscarTarefa();
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
      const handleOpen2 = () => {
        setOpen2(true);
      };
    
      const handleClose2 = () => {
        setOpen2(false);
      
      };

      const modalAtribuir = (
        <div className="container3">
        <form className='forms'>
            <div>
            <p style={estilo.p}>Atribuir tarefa</p>
            </div>
            
            <div style={{display:'flex', flexDirection:'row', justifyContent:'space-between', flexWrap:'wrap'}}>
            <h1 style={estilo.espacoCampo}><InputData style={estilo.input[0]} label="Início" funcao={(evento)=>handlePreencher(evento,"inicio")}/></h1 >
            <h1 style={estilo.espacoCampo}><InputData  width='30vw'   style={estilo.input[1]} label="Fim" funcao={(evento)=>handlePreencher(evento,"fim")}/></h1>
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

              {
                  tarefas && tarefas.map((tarefas,ind)=>{
                    let entrega = format(new Date(tarefas.prazo),"dd/MM/yyyy")
                    return <div style={{minWidth:'250px'}}>
                    <Card style={{borderRadius:'20px',marginTop:'20px'}}>
                        <CardContent style={{minWidth:'250px'}} className="card">
                            <div>
                                <p className="envolve">
        
                                <p className="texto">{tarefas.nome}</p>
        
                                    <div style={{color:'#FE963D', display:'flex', justifyItems:'center'}}>
                                        <CreateRoundedIcon style={{cursor:'pointer'}} />
                                        <DeleteRoundedIcon style={{marginLeft:'20px', cursor:'pointer'}}/>
                                        <PersonAddRoundedIcon style={{marginLeft:'20px', cursor:'pointer'}}/>
                                        <PeopleAltRoundedIcon style={{marginLeft:'20px', cursor:'pointer'}}/>
                                        
                                    </div>
                                </p>
                                <p style={{color:'#7A57EA', fontSize:'20px', marginTop:'20px'}}>{tarefas.descricao}</p>
                                <p style={{color:'#7A57EA',fontSize:'17px', marginTop:'40px'}}><i style={{color:'#FE963D',fontSize:'17px'}}>
                                    entrega:{entrega}
                                </i></p>
                                <p style={{color:'#7A57EA',fontSize:'17px'}}><i style={{color:'#FE963D',fontSize:'17px'}}>Término:</i></p>
                     
                            </div>
                        </CardContent>
                    </Card>
                </div>
                  })
              }

              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                className={classes.modal}
                >
                    {criarTarefa}
            </Modal>
            <Modal
                open={open2}
                onClose={handleClose2}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                className={classes.modal}
                >
                    {modalAtribuir}
            </Modal>
        </div>
    )
}