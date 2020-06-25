import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import api from '../../service/api'



export default function CadastrarTarefa() {

    const useStyles = makeStyles((theme) => ({
        container: {

    
        },
        paper: {

    
    
        },
        form: {
 
        
    
        },
        submit: {
 
    
        },
  
    
    })) ;

    const classes = useStyles();

    return (
        <div className={classes.container}>
     
            <div className={classes.paper}>
                <form className={classes.form} noValidate onSubmit={CadastrarTarefa}>
                    <TextField
                        fullWidth
                        type="text"
                        id="descricao"
                        label="Descrição da Tarefa"
                        placeholder="Breve descrição da Tarefa"
                        margin="normal"

                    >
                    </TextField>

                    <TextField
                        type="text"
                        id="dataEntrega"
                        label="Data para Entrega"
                        placeholder="dd/mm/yyyy"
                        margin="normal"

                    >
                    </TextField>

                    <Button
                        size="medium"
                        type="submit"
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Concluir
                    </Button>

                </form>
                <Typography>
                Atribuir á membro
                </Typography>
            </div>
        </div >
    );

}