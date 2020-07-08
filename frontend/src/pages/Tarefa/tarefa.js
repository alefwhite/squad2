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
      paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: "#303030",
        boxShadow: "-1px 4px 16px 2px rgba(0,0,0,0.48)",
        padding: theme.spacing(2, 4, 3),
        outline: 0,
        borderRadius: "3px"
    },
      formDel: {
        display: "flex",
        padding: "16px",
        marginTop: "5px",
        justifyContent: "space-between"
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
    const [open3, setOpen3] = useState(false);
    const [open4, setOpen4] = useState(false);
    const [open5, setOpen5] = useState(false);
    const [nome, setNome] = useState();
    const [entrega, setEntrega] = useState(new Date());
    const [descricao, setDescricao] = useState();
    const [tarefas, setTarefas] = useState([]);
    const [funcionario, setFuncionario] = useState([]);
    const [squad, setSquad] = useState([]);
    const [sqd, setSqd] = useState("Selecione a squad");
    const [idUsuario, setIdUsuario] = useState("Selecione o funcionario");
    const [idTarefa, setIdTarefa] = useState();
    const classes = useStyles();
    

    useEffect(()=>{
        buscar();
    },[])

    const buscar = () => { 
        api.get('/tarefa')
        .then(response => {
            setTarefas(response.data);
            console.log(response.data);
        })
        
        api.get('/meusfuncionarios')
        .then((response)=>{
            setFuncionario(response.data);
            console.log(response.data);
        })

        api.get('/squad')
        .then((response) =>{
            setSquad(response.data);
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
        
        buscar();
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
        setIdTarefa(ind.id_tarefa);
        console.log(ind);
       
      };
    
      const handleClose2 = () => {
        setOpen2(false);
        setIdUsuario("Selecione o funcionario");
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

      const handleSquad = (evento) => {
        setSqd(evento.target.value);
      }

      const handleAtribuirSquad = async () => {
          let id_squad = sqd;
          let id_tarefa = idTarefa;
          
          let data = {
              id_squad,
              id_tarefa
          }

          const response = await api.post('/squadtarefa',data);

          if(response.status === 200){
              toast.success(response.data.mensagem);
          }
          handleClose3();
      }

      const modalAtribuirTarefa = (
        <Dialog open={handleOpen2}  aria-labelledby="form-dialog-title" >
                            <DialogTitle style={{textAlign: "center", color: "#7A57EA", fontSize: "2.0em !important", fontWeight: "bold !important"}} id="form-dialog-title">Atribuir tarefa ao funcionario.</DialogTitle>
                            <DialogContent style={{textAlign: "center"}}>
                                <DialogContentText style={{color: "#FE963D", fontWeight: "bold !important"}}>
                                    Selecione o funcionário para cumprir a tarefa.
                                </DialogContentText>
                                <div style={{marginTop: "25px"}}>
                                    <select                                        
                                        className={"inputs"}
                                        required={true}  
                                        disabled={true}          
                                        value={idTarefa}
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
                                        Selecione o funcionario
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
   

      const handleOpen3 = (ind) => {
          setOpen3(true);
          setIdTarefa(ind.id_tarefa);
          console.log(ind.id_tarefa);
      }

      const handleClose3 = () => {
          setOpen3(false);
          setSqd("Selecione a squad");
      }

      const modalAtribuirSquad = (
        <Dialog open={handleOpen3}  aria-labelledby="form-dialog-title" >
        <DialogTitle style={{textAlign: "center", color: "#7A57EA", fontSize: "2.0em !important", fontWeight: "bold !important"}} id="form-dialog-title">Atribuir tarefa a squad.</DialogTitle>
        <DialogContent style={{textAlign: "center"}}>
            <DialogContentText style={{color: "#FE963D", fontWeight: "bold !important"}}>
                Selecione a squad para atribuir a tarefa.
            </DialogContentText>
            <div style={{marginTop: "25px"}}>
                <select                                        
                    className={"inputs"}
                    required={true}  
                    disabled={true}          
                    value={idTarefa}
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
                    onChange={handleSquad}
                    value={sqd}
                    name="funcionario"
                    id="funcionario"
                    style={{cursor: "pointer", padding: "15px", background: "#303030"}}
                >
                <option disabled value="Selecione a squad">
                    Selecione a squad
                </option>
                      {
                        squad && squad.map((squad) => {
                        return <option key={squad.id_squad} value={squad.id_squad}>{squad.nome}</option>
                        })
                      }
                </select>
            </div>                                
        </DialogContent>
        <DialogActions style={{display: "flex", justifyContent: "space-around", marginBottom: "15px"}}>
            <button className="btn_sim" onClick={handleAtribuirSquad}>
                Inserir
            </button>
            <button className="btn_nao" onClick={handleClose3}>
                Cancelar
            </button>
        </DialogActions>
    </Dialog>
      )

      const handleOpen4 = (ind) => {
        setOpen4(true);
        setIdTarefa(tarefas[ind].id_tarefa);
    }

    const handleClose4 = () => {
        setOpen4(false);
    }

    const handleDeletar = async () => {
        const response = await api.delete(`tarefa/${idTarefa}`);

        if(response.status === 200){
            toast.success(response.data.mensagem);
            buscar();
            handleClose4();
        }
    }

      const modalDeletar = (
        <div  className={classes.paper}>
        <h2 style={{color: "#7A57EA", marginBottom: "11px", textAlign: "center"}} id="simple-modal-title">Tem certeza que você deseja excluir?</h2>
        <div id="simple-modal-description">
            <div className={classes.formDel} onSubmit={handleDeletar}>
                  <button style={{marginTop: "30px"}} className="btn_sim" onClick={()=>handleDeletar()}>Sim</button>
                  <button style={{marginTop: "30px"}} className="btn_nao" onClick={() => handleClose4()}>Não</button>
            </div>
        </div>
      </div>
      )


      const handleOpen5 = (index) => {
        setOpen5(true);
        let k = tarefas[index].prazo;
        console.log(k);
        setIdTarefa(tarefas[index].id_tarefa);
        setNome(tarefas[index].nome);
        setEntrega(k);
        setDescricao(tarefas[index].descricao);
    }

    const handleClose5 = () => {
        setOpen5(false);
    }

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
            case "entrega":{
                setEntrega(evento);
                break;
            }
            default: 
                return 
        }
        
    }
    const handleEditar = async (x) => {

        x.preventDefault();

        let prazo = format(new Date(entrega), "yyyy/MM/dd");

        let data = {
            nome,
            descricao,
            prazo
        }
        
        const response = await api.put(`/tarefa/${idTarefa}`,data);

        if(response.status === 200){
            toast.success(response.data.mensagem);
        }
        buscar();
        handleClose5();
    }
      const modalEditar = (
        <div className = "container3" onSubmit={handleEditar}>
            <form className='forms' >
                <div>
                <p style={estilo.p}>Nome da tarefa</p>
                </div>
                <h1 style={estilo.espacoCampo}><Input width="45vw" variant="standard" value={nome} funcao={(evento) => handlePreencher(evento, "nome")}/></h1 >
                <div style={{display:'flex', flexDirection:'row', justifyContent:'space-between', flexWrap:'wrap'}}>
                <h1 style={estilo.espacoCampo}><InputData style={estilo.input[0]} label="Início" value={entrega} funcao={(evento) => handlePreencher(evento, "entrega")}/></h1 >
                </div>
                <div>
                <p style={estilo.p}>Descrição do projeto</p>
                <h1  style={estilo.espacoCampo}><Input  multiline="false" width="35vw" value={descricao} funcao={(evento) => handlePreencher(evento, "descricao")}/></h1 >
                </div>
                <h1 style={{textAlign:'center'}}><Botao type="submit" children="CONCLUIR" width="90px" ></Botao></h1>
           
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

                    return <div key={tarefas.id_tarefa} style={{minWidth:'250px'}}>
                    <Card style={{borderRadius:'20px',marginTop:'20px'}}>
                        <CardContent style={{minWidth:'250px'}} className="card">
                            <div>
                                <div className="envolve">
        
                                <p className="texto">{tarefas.nome}</p>
        
                                    <div style={{color:'#FE963D', display:'flex', justifyItems:'center'}}>
                                        <CreateRoundedIcon style={{cursor:'pointer'}} onClick={() => handleOpen5(ind)}/>
                                        <DeleteRoundedIcon style={{marginLeft:'20px', cursor:'pointer'}} onClick={() => handleOpen4(ind)}/>
                                        <PersonAddRoundedIcon style={{marginLeft:'20px', cursor:'pointer'}} onClick={() => handleOpen2(tarefas)}/>
                                        <PeopleAltRoundedIcon style={{marginLeft:'20px', cursor:'pointer'}} onClick={() => handleOpen3(tarefas)}/>
                                        
                                    </div>
                                </div>
                                <p style={{color:'#7A57EA', fontSize:'20px', marginTop:'20px'}}>{tarefas.descricao}</p>
                                <p style={{color:'#7A57EA',fontSize:'17px', marginTop:'40px'}}><i style={{color:'#FE963D',fontSize:'17px'}}>
                                    entrega:{entrega}
                                </i></p>

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
                    {modalAtribuirTarefa}
            </Modal>
            
            <Modal
                open={open3}
                onClose={handleClose3}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                className={classes.modal}
                >
                    {modalAtribuirSquad}
            </Modal>

            <Modal
                open={open4}
                onClose={handleClose4}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                className={classes.modal}
                >
                    {modalDeletar}
            </Modal>

            <Modal
                open={open5}
                onClose={handleClose5}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                className={classes.modal}
                >
                    {modalEditar}
            </Modal>


            

              <ToastContainer/>
        </div>

    
    )
}