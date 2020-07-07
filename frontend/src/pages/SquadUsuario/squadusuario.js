import { forwardRef } from 'react';
import AddBox from '@material-ui/icons/AddBox';
import SaveAlt from '@material-ui/icons/SaveAlt';
import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import MaterialTable from 'material-table';
import Modal from '@material-ui/core/Modal';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import CircularProgress from '@material-ui/core/CircularProgress';

import { toast } from 'react-toastify';
import api from '../../service/api';

const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} style={{fontSize: "2.0em", color: "#7A57EA"}}/>),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} style={{fontSize: "2.0em", color: "#FE963D"}}/>)
};

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        padding: "30px",
        boxShadow: "-1px 4px 16px 2px rgba(0,0,0,0.48)"        
    },   
    titlePage: {
        color: "#7A57EA",
        fontWeight: "200",
        marginBottom: "20px"
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


const SquadUsuario = () => {
    const classes = useStyles();
    const [modalStyle] = useState(getModalStyle);
    const [modalBody, setModalBody] = useState(true)
    const [open, setOpen] = useState(false);

    const [funcionarios, setFuncionarios] = useState([]);
    const [funcionarioId, setFuncionarioId] = useState('Selecione o usuário');
    const [squads, setSquads] = useState([]);
    const [squadId, setSquadId] = useState('Selecione a squad');
    const [id_squadusuario, setIdSquadUsuario] = useState(null);

    const [loader, setLoader] = useState("block");

    const [state, setState] = useState({        
        data: [
          
        ],
    });

    const [openDialog, setOpenDialog] = useState(false);

    const handleClickOpen = () => {
        setOpenDialog(true);
    };
    
    const handleClickClose = () => {
        setOpenDialog(false);
    };

    const handleOpen = (id, data) => {
        if(data) {
            console.log("Data, ", data)
            setSquadId(data.squad);
            setFuncionarioId(data.usuario);
        }

        setIdSquadUsuario(id);
        setOpen(true);
    };
    
    const handleClose = () => {
        setOpen(false);
    };

    const columns = [
        { title: 'Squads', field: 'squad' },
        { title: 'Usuários', field: 'nome' },
    ]

    const ListarSquads = async () => {
        await api.get("/squad")
        .then((response) => {
            setSquads(response.data);
        })
    };

    const ListarUsuarios = async () => {
        await api.get("/meusfuncionarios")
        .then((response) => {
            setFuncionarios(response.data);
        })
    };

    const ListarSquadUsuarios = async () => {
        await api.get("/squadusuario")
        .then((response) => {
            setState({ data: response.data });
        })
    };


    const AtualizaSquad = (e) => {
        console.log("Squad: ", e.target.value)
        setSquadId(e.target.value);
    }

    const AtualizaFuncionario = (e) => {
        console.log("Func: ", e.target.value)
        setFuncionarioId(e.target.value);
    }

    const InserirSquadUsuario = async () => {
        
        if(squadId === "Selecione a squad" || funcionarioId === "Selecione o usuário") {
            return toast.info("Squad e usuário são obrigatórios!");
        }

        let data = {
           id_squad: squadId,
           id_usuario: funcionarioId
        };

        await api.post("/squadusuario", data)
        .then((response) => {
            if(response.status === 200) {
                toast.success(response.data.mensagem);
                ListarSquadUsuarios();
                handleClickClose();
            }
        })
    }

    const EditarSquadUsuario = async (e) => {
        e.preventDefault();

        let data = {
            id_squad: squadId,
            id_usuario: funcionarioId
        };


        await api.put(`/squadusuario/${id_squadusuario}`, data)
        .then((response) => {
            if(response.status === 200) {
                toast.success(response.data.mensagem);
                ListarSquadUsuarios();
                setSquadId("Selecione a squad");
                setFuncionarioId("Selecione o usuário");
                handleClose();
            }
        })
    }
    
    const bodyEditar = (
        <div style={modalStyle} className={classes.paper}>
          <h2 style={{color: "#7A57EA", marginBottom: "11px"}} id="simple-modal-title">Editar nome da Squad</h2>
          <div id="simple-modal-description">
              <form className={clsx(classes.formEdit)} onSubmit={EditarSquadUsuario}>
                    <div style={{marginTop: "25px"}}>
                        <select                                        
                            className={clsx("inputs")}
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
                            className={clsx("inputs")}
                            required={true}            
                            onChange={AtualizaFuncionario}
                            value={funcionarioId}
                            name="funcionario"
                            id="funcionario"
                            style={{cursor: "pointer", padding: "15px", background: "#303030", maxWidth: "320px"}}
                        >
                        <option disabled value="Selecione o usuário">
                            Selecione o usuário
                        </option>
                            {
                                funcionarios && funcionarios.map((func) => {
                                    return <option key={func.id_usuario} value={func.id_usuario}>{func.nome}</option>
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
    );

    const ExcluirSquadUsuario = async (e) => {
        e.preventDefault();

        await api.delete(`/squadusuario/${id_squadusuario}`)
        .then((response) => {
            if(response.status === 200) {
                toast.success(response.data.mensagem);
                
                handleClose();
            }
        })
    }

    const bodyExcluir = (
        <div style={modalStyle} className={classes.paper}>
          <h2 style={{color: "#7A57EA", marginBottom: "11px", textAlign: "center"}} id="simple-modal-title">Tem certeza que você deseja excluir?</h2>
          <div id="simple-modal-description">
              <form className={clsx(classes.formDel)} onSubmit={ExcluirSquadUsuario}>
                    <button style={{marginTop: "35px"}} className="btn_sim" type="submit">Sim</button>
                    <button style={{marginTop: "35px"}} className="btn_nao" onClick={() => handleClose()}>Não</button>
              </form>
          </div>
        </div>
    );

    useEffect(() => {
        document.title = "Squad/Usuário";

        ListarSquadUsuarios();
        ListarSquads();
        ListarUsuarios();
        
        setTimeout(() => {
            setLoader("none");
        }, 1500);

    },[]);

    return (
        <>              
            <Container maxWidth="lg" style={{background: "#303030"}} className={classes.root}> 
                <h1 className={classes.titlePage}>Squad/Usuário</h1>
                <div style={{textAlign: "center", display: loader}}>
                    <CircularProgress size="100px" style={{color: "#FE963D"}} />
                </div>
                <div style={{textAlign: "center"}}>                    
                    <div>
                        <button className="btn" style={{color: "white"}} onClick={handleClickOpen}>
                           Cadastrar
                        </button>
                        <Dialog open={openDialog} onClose={handleClickClose} aria-labelledby="form-dialog-title" >
                            <DialogTitle style={{textAlign: "center", color: "#7A57EA", fontSize: "2.0em !important", fontWeight: "bold !important"}} id="form-dialog-title">Inserir usuários em squads</DialogTitle>
                            <DialogContent style={{textAlign: "center"}}>
                                <DialogContentText style={{color: "#FE963D", fontWeight: "bold !important"}}>
                                    Selecione a squad, depois o usuário que você deseja incluir na squad.
                                </DialogContentText>
                                <div style={{marginTop: "25px"}}>
                                    <select                                        
                                        className={clsx("inputs")}
                                        required={true}            
                                        onChange={AtualizaSquad}
                                        value={squadId}
                                        name="squad"
                                        id="squad"
                                        style={{cursor: "pointer", padding: "14px", background: "#303030"}}
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
                                        className={clsx("inputs")}
                                        required={true}            
                                        onChange={AtualizaFuncionario}
                                        value={funcionarioId}
                                        name="funcionario"
                                        id="funcionario"
                                        style={{cursor: "pointer", padding: "15px", background: "#303030"}}
                                    >
                                    <option disabled value="Selecione o usuário">
                                        Selecione o usuário
                                    </option>
                                        {
                                            funcionarios && funcionarios.map((func) => {
                                                return <option key={func.id_usuario} value={func.id_usuario}>{func.nome}</option>
                                            })
                                        }
                                    </select>
                                </div>                                
                            </DialogContent>
                            <DialogActions style={{display: "flex", justifyContent: "space-around", marginBottom: "15px"}}>
                                <button className="btn_sim" onClick={InserirSquadUsuario} >
                                    Inserir
                                </button>
                                <button className="btn_nao" onClick={handleClickClose}>
                                    Cancelar
                                </button>
                            </DialogActions>
                        </Dialog>
                    </div>
                </div>               
               <MaterialTable
                    className={classes.iconColor}
                    style={{    
                        boxShadow: "-1px 4px 16px 2px rgba(0,0,0,0.48)",
                        background: "#303030",
                       
                    }}
                    title=""
                    icons={tableIcons}
                    columns={columns}
                    data={state.data}
                    actions={[
                        // {
                        //     icon: 'save',
                        //     tooltip: 'Inserir',
                        //     onClick: (event, rowData) => {
                        //       // Do save operation
                        //       handleOpen();
                        //     }
                        // },
                        {
                            icon: 'edit',
                            tooltip: 'Editar',
                            onClick: (event, rowData) => {
                                setModalBody(true);
                                console.log("Row", rowData)
                                handleOpen(rowData.id_squadusuario, {squad: rowData.id_squad, usuario:rowData.id_usuario});
                            }
                        },
                        {
                            icon: 'delete',
                            tooltip: 'Deletar',
                            onClick: (event, rowData) => {
                                setModalBody(false);
                                handleOpen(rowData.id_squadusuario);
                            }    
                        }
                    ]}
                    localization={{
                        body: {
                          emptyDataSourceMessage: 'Nenhuma squad cadastrada',
                          addTooltip: "Inserir nova squad",
                          editRow: {
                                saveTooltip: "Inserir",
                                cancelTooltip: "Cancelar"
                          }
                        },
                        toolbar: {
                          searchTooltip: 'Pesquisar',
                          searchPlaceholder: 'Pesquisar',
                          exportName: "Exportar",
                          exportTitle: "Exportar"

                        },
                        header:{
                            actions: "Ações"
                        },
                        pagination: {
                          labelRowsSelect: 'linhas',
                          labelDisplayedRows: '{count} de {from}-{to}',
                          firstTooltip: 'Primeira página',
                          previousTooltip: 'Página anterior',
                          nextTooltip: 'Próxima página',
                          lastTooltip: 'Última página'
                        },
                        
                    }}
                    options={{
                        cellStyle: {
                            color: "#FE963D"
                        },
                        rowStyle: {
                          background: "#303030",
                          fontWeight: "700",

                        },
                        headerStyle: {
                            color: '#7A57EA',
                            fontWeight: "700",
                            background: "#303030",
                            fontSize: "18px",

                        },
                        searchFieldStyle: {
                            color: "#FE963D",
                        },
                        tableLayout: "auto",
                        paginationType: "stepped",
                        actionsCellStyle: {
                            color: "#FE963D"
                        },
                        searchAutoFocus: true,
                        detailPanelColumnAlignment: "left",
                        loadingType: "overlay",
                        toolbarButtonAlignment: "right",
                        searchFieldAlignment: "left",
                        pageSizeOptions: [5,10],
                        toolbar: true,
                        exportButton: true,
                        exportFileName: "squadusuario",

                    }}
                   
                />
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
            </Container>
        </>
    )
}

export default SquadUsuario;