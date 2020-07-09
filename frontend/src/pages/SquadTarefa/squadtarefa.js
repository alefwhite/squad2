import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import api from '../../service/api';
import InfiniteScroll from 'react-infinite-scroll-component';
import CreateRoundedIcon from '@material-ui/icons/CreateRounded';
import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded';
import './squadtarefa.css';
import {format} from 'date-fns';
import formatarDataBr from '../../utils/formatarDataBr';
import Modal from '@material-ui/core/Modal';
import { toast } from 'react-toastify';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: "#303030",
    boxShadow: "2px 2px 33px 0px rgba(0,0,0,0.32)",
    borderRadius: "20px",
    display: 'flex',
    width: "100%",
    color: "#7A57EA"
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
  formEdit: {
    display: "flex",
    flexDirection: "column",
    padding: "10px"
  },
  formDel: {
    display: "flex",
    padding: "16px",
    marginTop: "5px",
    justifyContent: "space-between"
  }
}));

function getModalStyle() {
  
  return {
    top: `${40}%`,
    left: `${55}%`,
    transform: `translate(-${50}%, -${50}%)`,
  };
} 


const SquadTarefa = () => {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const [modalBody, setModalBody] = useState(true); 
  const [squadTarefa, setSquadTarefa] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [open, setOpen] = useState(false);

  const [id_squadtarefa, setIdSquadTarefa] = useState(null);
  const [squads, setSquads] = useState([]);
  const [squadId, setSquadId] = useState('Selecione a squad');
  const [tarefas, setTarefas] = useState([]);
  const [tarefaId, setTarefaId] = useState('Selecione a tarefa');

  const AtualizaSquad = (e) => {
      setSquadId(e.target.value);
  };

  const AtualizaTarefa = (e) => {
      setTarefaId(e.target.value);
  };

  const ListarSquads = async () => {
    await api.get("/squad")
    .then((response) => {
        setSquads(response.data);
    })
  };

  const ListarTarefas = async () => {
    await api.get("/tarefa")
    .then((response) => {
        setTarefas(response.data);
    })
  };


  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = (id_squadtarefa) => {
    setIdSquadTarefa(id_squadtarefa);
    setOpen(true);
  };

  
  const ExcluirSquadTarefa = async (e) => {
      e.preventDefault();
      const response = await api.delete(`/squadtarefa/${id_squadtarefa}`);

      if(response.status === 200) {
        toast.success(response.data.mensagem);
        setSquadTarefa(squadTarefa.filter((t) => {
            return t.id_squadtarefa !== id_squadtarefa;
        }));
        handleClose();
      }

  };

  const EditarSquadTarefa = async (e) => {
    e.preventDefault();

    let data = {
      id_squad : squadId,
      id_tarefa: tarefaId
    }

    const response = await api.put(`/squadtarefa/${id_squadtarefa}`, data);

    if(response.status === 200) {
      toast.success(response.data.mensagem);
      ListarSquadTarefa();
      handleClose();
    }

  };

  const ListarSquadTarefa = async () => {    
    const response = await api.get(`/squadtarefa?page=${page}`);

    if(response.status === 200) {
      setSquadTarefa(squadTarefa.concat(response.data));
      setTotalPage(response.headers['x-total-count']);
    }

  };  
  
  
  const fetchMoreData = () => {
    setTimeout(() => {       
      
      if(page < totalPage) {
        setPage(page + 1);             
      }

      if(squadTarefa.length >= totalPage) {
        setHasMore(false);
      }

      ListarSquadTarefa();
    
    }, 800);

  };

  const bodyExcluir = (
    <div style={modalStyle} className={classes.paper}>
      <h2 style={{color: "#7A57EA", marginBottom: "11px", textAlign: "center"}} id="simple-modal-title">Tem certeza que você deseja excluir?</h2>
      <div id="simple-modal-description">
          <form className={classes.formDel} onSubmit={ExcluirSquadTarefa} >
                <button style={{marginTop: "35px"}} className="btn_sim" type="submit">Sim</button>
                <button style={{marginTop: "35px"}} className="btn_nao" onClick={() => handleClose()}>Não</button>
          </form>
      </div>
    </div>
  );

  const bodyEditar = (
    <div style={modalStyle} className={classes.paper}>
      <h2 style={{color: "#7A57EA", marginBottom: "11px"}} id="simple-modal-title">Editar Squad/Tarefa</h2>
      <div id="simple-modal-description">
          <form className={classes.formEdit} onSubmit={EditarSquadTarefa}>
                <div style={{marginTop: "25px"}}>
                    <select                                        
                        className="inputs"
                        required={true}            
                        onChange={AtualizaSquad}
                        value={squadId}
                        name="squad"
                        id="squad"
                        style={{cursor: "pointer", padding: "14px", background: "#303030", maxWidth: "320px"}}
                    >
                    <option disabled value="Selecione a squad">
                        Selecione a squad
                    </option>
                        {
                            squads && squads.map((squad) => {
                                return <option key={squad.id_squad} value={squad.id_squad}>{squad.nome}</option>
                            })
                        }
                    </select>

                </div>
                <div style={{marginTop: "15px", marginBottom: "15px"}}>
                    <select
                        className="inputs"
                        required={true}            
                        onChange={AtualizaTarefa}
                        value={tarefaId}
                        name="tarefa"
                        id="tarefa"
                        style={{cursor: "pointer", padding: "15px", background: "#303030", maxWidth: "320px"}}
                    >
                    <option disabled value="Selecione a tarefa">
                        Selecione a tarefa
                    </option>
                        {
                            tarefas && tarefas.map((t) => {
                                return <option key={t.id_tarefa} value={t.id_tarefa}>{t.nome}</option>
                            })
                        }
                    </select>
                </div>      
                <div style={{display: "flex", justifyContent: "space-between"}}> 
                    <button style={{marginTop: "30px"}} className="btn_sim" type="submit">Editar</button>
                    <button style={{marginTop: "30px"}} className="btn_nao" onClick={() => handleClose()}>Fechar</button>
                </div>
          </form>
      </div>
    </div>
  )
  
  useEffect(() => {
    document.title = "Squad tarefas";
    
    (async () => {
      
      const response = await api.get(`/squadtarefa?page=${page}`);

      if(response.status === 200) {
        setSquadTarefa(squadTarefa.concat(response.data));
        setTotalPage(response.headers['x-total-count']);
        setPage(page + 1);     
      };

    })();
    
    ListarSquads();
    ListarTarefas();

  }, []);

  return (
    <div className="contentSquads">
        <h1 className="titleSquads">Tarefas das Squads</h1>        
        <div className={classes.root}>        
        {     
              <InfiniteScroll
                dataLength={squadTarefa.length}
                next={fetchMoreData}
                hasMore={hasMore}
                loader={ squadTarefa.length > 0 ? <h4 style={{textAlign: "center", color: "#FE963D"}}>Carregando....</h4> : ""}
                endMessage={
                  squadTarefa.length > 0 ?
                    <h1 style={{textAlign: 'center', color: "#FE963D", marginBottom: "15PX"}}>
                      <b>Fim das tarefas!</b>
                    </h1> 
                  : ""
                }
              >
                <div className="cardSquadTarefa">
                  {   
                      squadTarefa.length > 0 ?
                        squadTarefa && squadTarefa.map((t, y) => {                
                          return <div className="cardSquadTarefaContent" key={y}>
                                    <div className="headerTarefa"> 
                                      <p className="titleTarefaContent">{t.tarefa_nome }</p>
                                      <div className="squadIcon">
                                          <CreateRoundedIcon style={{cursor:'pointer'}} 
                                              onClick={() => {
                                                setModalBody(true);
                                                handleOpen(t.id_squadtarefa);
                                              }}
                                          />
                                          <DeleteRoundedIcon style={{marginLeft:"15px", cursor:'pointer'}} 
                                              onClick={() => {
                                                setModalBody(false);
                                                handleOpen(t.id_squadtarefa);
                                              }}
                                          />
                                      </div>                                    
                                    </div>
                                    <div className="tarefaContent">
                                        <ul className="ulContent">
                                            <li><span>Descrição: </span>{t.tarefa_descricao}</li>
                                            <li><span>Projeto: </span>{t.projeto}</li>
                                            <li><span>Squad: </span>{t.squad}</li>
                                            <li><span>Prazo: </span>{formatarDataBr(format(new Date(t.prazo), "yyyy-MM-dd"))}</li>
                                            <li><span>Hora Estimada: </span>{t.hora_estimada}</li>
                                        </ul>
                                    </div>
                                 </div>
                        })
                      : <h1 style={{color: "#7A57EA", margin: "auto", textAlign: "center"}}>Squads sem tarefas</h1>
                    }
                </div>
              </InfiniteScroll>                   
               
              
          }
        
        </div> 
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                {
                    modalBody ? bodyEditar : bodyExcluir
                }
            </Modal>
        </div>       
    </div>
  );
}
export default SquadTarefa;