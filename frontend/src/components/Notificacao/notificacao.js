import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Alert } from '@material-ui/lab';
import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';
import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';
import api from '../../service/api';

const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      '& > * + *': {
        marginTop: theme.spacing(2),
      },
      position: "absolute"
    },
    position: {
        position: "fixed",
        top: 0,
        right: 0
    },
    positionClosed: {
        position: "fixed",
        top: 0,
        right: 0,
        color: "#FFF"
    },
    marginsAlert: {
        marginBottom: "10px",
        marginTop: "10px",
    } 

}));

export default function Notificacao() {
    const classes = useStyles();
    const [open, setOpen] = useState(true);
    const [notificacoes, setNotificacoes] = useState([]);

    const ListarNotificacoes = async () => {
        await api.get("/notificacao")
            .then((response) => {
                if(response.status === 200) {
                    setNotificacoes(response.data);
                    console.log("Notificacoes: ", response.data)
                }
            });
    }   
    useEffect(() => {
        ListarNotificacoes();
    }, []);

    return (
      <div className={classes.root}>         
        <Collapse in={open} style={{maxWidth: "400px"}} className={classes.positionClosed}>
            {
                notificacoes && notificacoes.map((n) => {
                    console.log("Teste")
                    return (
                        <Alert
                            className={classes.marginsAlert}
                            key={n._id}
                            variant="outlined"
                            color="warning"
                            action={
                            <IconButton
                                aria-label="close"
                                size="small"
                                onClick={() => {
                                    setOpen(false);
                                }}
                            >
                                <CloseIcon fontSize="inherit"   style={{color: "#FFF"}}/>
                            </IconButton>
                            }
                        >  
                            <div style={{color: "white"}}>
                               <p>
                                   {n.conteudo}
                               </p>
                            </div>

                        </Alert>
                    )
                })
            }
        </Collapse>
        
        <Button
          disabled={open}
          variant="outlined"
          onClick={() => {
            setOpen(true);
          }}
        >
          Re-open
        </Button>
      </div>
    );
}

