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
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { toast, ToastContainer } from 'react-toastify';

const useStyles = makeStyles((theme)=>({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
      campos: {
       
        '& label.Mui-focused': {
            color: '#FE963D',
            fontWeight:'bold',
        
        }, 
        '& .MuiFormLabel-root':{
            color:'#FE963D',
        },

        '& .MuiInputLabel-outlined.MuiInputLabel-shrink': {
            color: '#FE963D',
            fontWeight:'bold',
        
        },  
            
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
            border:'2px solid #7A57EA',
            borderRadius: '20px',
            
            },
            '&:hover fieldset': {
                borderColor: '#7A57EA',
            },
            '&.Mui-focused fieldset': {
                borderColor: '#7A57EA',
            },
            '& .MuiInputBase-input': {
                color: "#7A57EA",
                borderRadius: '22px',
            },
        
        },
        '& .MuiInputBase-root':{
            '& .MuiInputBase-input': {
                color: "#FE963D",            
                borderBottom: '2px solid #7A57EA',
                width: '180px'
            },
            
            '&:hover .MuiInputBase-input':{
                borderColor:'#7A57EA',
            }
        }
        ,
            
        '& .MuiInput-underline:after':{
            borderBottom: '2px solid #7A57EA',        
        },    
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
    const [funcionario, setFuncionario] = useState([]);
    const [index,setIndex] = useState();
    const [idUsuario, setIdUsuario] = useState("Selecione o funcionario");
    const [idTarefa, setIdTarefa] = useState();

    useEffect(()=>{
        buscarTarefa();
    },[])

    const buscarTarefa = () => { 
        api.get('/tarefa')
        .then(response => {
            setTarefas(response.data);
            console.log(response.data);
        })
        
        api.get("/meusfuncionarios")
        .then((response)=>{
            setFuncionario(response.data);
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
        },
        p2:{
            color:'#FE963D',
            marginLeft:'2%',
            fontSize:'25px',
            textAlign:'center' 
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
      const handleOpen2 = (ind) => {
        setOpen2(true);
        setIndex(ind.id_tarefa);
        setIdTarefa(ind.id_tarefa);
        console.log(ind);
       
      };
    
      const handleClose2 = () => {
        setOpen2(false);
        setIdUsuario("Selecione o funcionario")
      };
      const handleFuncionario = (evento) => {
        setIdUsuario(evento.target.value);
        console.log(evento.target.value);
        console.log(idTarefa);
      }

      const handleAtribuirUsuario = async () => {
        
        let id_tarefa = idTarefa;
        let id_usuario = idUsuario;

        let data = {
            id_tarefa,
            id_usuario
        }


        const response = await api.post('/usuariotarefa',data);
        if(response.status === 200){
            toast.success(response.data.mensagem);
        }
    

        handleClose2();
      }
      const modalAtribuir = (
        <Dialog open={handleOpen2}  aria-labelledby="form-dialog-title" >
                            <DialogTitle style={{textAlign: "center", color: "#7A57EA", fontSize: "2.0em !important", fontWeight: "bold !important"}} id="form-dialog-title">Atribuir tarefas aos funcionario</DialogTitle>
                            <DialogContent style={{textAlign: "center"}}>
                                <DialogContentText style={{color: "#FE963D", fontWeight: "bold !important"}}>
                                    Selecione o funcionário para cumprir a tarefa.
                                </DialogContentText>
                                <div style={{marginTop: "25px"}}>
                                    <select                                        
                                        className={"inputs"}
                                        required={true}  
                                        disabled={true}          
                                        value={index}
                                        name="squad"
                                        id="squad"
                                        style={{cursor: "pointer", padding: "14px", background: "#303030"}}
                                    >
                                    <option disabled value="Selecione a squad">
                                        Tarefa
                                    </option>
                                       {
                                           tarefas && tarefas.map((tarefa)=>{
                                                return <option key={tarefa.id_tarefa} value={tarefa.id_tarefa}>{tarefa.nome}</option>                                         
                                           })
                                       }
                                    </select>

                                </div>
                                <div style={{marginTop: "15px", marginBottom: "15px"}}>
                                    <select
                                        className={"inputs"}
                                        required={true}            
                                        onChange={handleFuncionario}
                                        value={idUsuario}
                                        name="funcionario"
                                        id="funcionario"
                                        style={{cursor: "pointer", padding: "15px", background: "#303030"}}
                                    >
                                    <option disabled value="Selecione o funcionario">
                                        Selecione o funcionário
                                    </option>
                                      {
                                          funcionario && funcionario.map((funcionario) => {
                                              return <option key={funcionario.id_usuario} value={funcionario.id_usuario}>{funcionario.nome}</option>
                                          })
                                      }
                                    </select>
                                </div>                                
                            </DialogContent>
                            <DialogActions style={{display: "flex", justifyContent: "space-around", marginBottom: "15px"}}>
                                <button className="btn_sim" onClick={handleAtribuirUsuario}>
                                    Inserir
                                </button>
                                <button className="btn_nao" onClick={handleClose2}>
                                    Cancelar
                                </button>
                            </DialogActions>
                        </Dialog>
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

                    return <div key={tarefas.id_tarefa} style={{minWidth:'250px'}}>
                    <Card style={{borderRadius:'20px',marginTop:'20px'}}>
                        <CardContent style={{minWidth:'250px'}} className="card">
                            <div>
                                <div className="envolve">
        
                                <p className="texto">{tarefas.nome}</p>
        
                                    <div style={{color:'#FE963D', display:'flex', justifyItems:'center'}}>
                                        <CreateRoundedIcon style={{cursor:'pointer'}} />
                                        <DeleteRoundedIcon style={{marginLeft:'20px', cursor:'pointer'}}/>
                                        <PersonAddRoundedIcon style={{marginLeft:'20px', cursor:'pointer'}} onClick={() => handleOpen2(tarefas)}/>
                                        <PeopleAltRoundedIcon style={{marginLeft:'20px', cursor:'pointer'}}/>
                                        
                                    </div>
                                </div>
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
              <ToastContainer/>
        </div>

    
    )
}