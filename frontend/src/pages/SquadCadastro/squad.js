import { forwardRef } from 'react';
import AddBox from '@material-ui/icons/AddBox';
import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import MaterialTable from 'material-table';
import Modal from '@material-ui/core/Modal';

import { toast } from 'react-toastify';
import Input from '../../components/Input/Input';
import api from '../../service/api';

const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} style={{fontSize: "2.0em", color: "#7A57EA"}}/>),
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
    form: {
        display: "flex",
        flexDirection: "column",
        padding: "10px"
    }
    
}));


function getModalStyle() {
  
    return {
      top: `${40}%`,
      left: `${55}%`,
      transform: `translate(-${50}%, -${50}%)`,
    };
}  


const Squad = () => {
    const classes = useStyles();
    const [modalStyle] = useState(getModalStyle);
    const [open, setOpen] = useState(false);
    const [squad, setSquad] = useState('');
    const [state, setState] = useState({        
        data: [
          
        ],
    });

    const handleOpen = () => {
     setOpen(true);
    };
    
    const handleClose = () => {
        setOpen(false);
    };

    const columns = [
        { title: 'Nome', field: 'nome' },
    ]

    const ListarSquads = async () => {
        await api.get("/squad")
        .then((response) => {
            setState({ data: response.data });
        })
    };

    const InserirSquad = async (novaSquad) => {
        // e.preventDefault();

        let data = {
            nome: novaSquad
        };
        console.log("Suqds", novaSquad);

        await api.post("/squad", data)
        .then((response) => {
            if(response.status === 201) {
                toast.warning(response.data.mensagem);
                ListarSquads();
            }
        })
    }

    const EditarSquad = async () => {
        // e.preventDefault();

        let data = {
            nome: squad
        };


        await api.put("/squad", data)
        .then((response) => {
            if(response.status === 201) {
                toast.warning(response.data.mensagem);
                ListarSquads();
                handleClose();
            }
        })
    }
    
    const body = (
        <div style={modalStyle} className={classes.paper}>
          <h2 style={{color: "#7A57EA", marginBottom: "11px"}} id="simple-modal-title">Alterar Squad</h2>
          <div id="simple-modal-description">
              <form className={clsx(classes.form)} onSubmit={EditarSquad}>
                    <Input style={{width: "100%"}} type="text" name="squad"  value={squad || ''} label="Nome da squad" funcao={e => setSquad(e.target.value)}/>
                    <button style={{marginTop: "30px"}} className="botao" type="submit">Inserir</button>
              </form>
          </div>
        </div>
    );

    useEffect(() => {
        ListarSquads();
    },[]);

    return (
        <>              
            <Container maxWidth="lg" style={{background: "#303030"}} className={classes.root}> 
                <h1 className={classes.titlePage}>Squads</h1>               
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
                                alert("You saved " + rowData.id_squad) 
                                handleOpen();
                            }
                        },
                        {
                            icon: 'delete',
                            tooltip: 'Deletar',
                            onClick: (event, rowData) => {
                                 alert("You saved " + rowData.id_squad)
                            }    
                        }
                    ]}
                    localization={{
                        body: {
                          emptyDataSourceMessage: 'Nenhum registro para exibir',
                          addTooltip: "Inserir nova squad"
                        },
                        toolbar: {
                          searchTooltip: 'Pesquisar',
                          searchPlaceholder: 'Pesquisar'

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
                        }
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
                        pageSizeOptions: [5,10]

                    }}
                    editable={{
                        onRowAdd: novoNome =>
                          new Promise((resolve, reject) => {
                            setSquad(novoNome.nome);
                            console.log("teste", novoNome.nome)
                            setTimeout(() => {
                               InserirSquad(novoNome.nome);
                                resolve();
                            }, 1000);
                          }),
                    }}
                />
                <div>
                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="simple-modal-title"
                        aria-describedby="simple-modal-description"
                    >
                        {body}
                    </Modal>
                </div>
            </Container>
        </>
    )
}

export default Squad;