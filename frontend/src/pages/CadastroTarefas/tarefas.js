import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import api from '../../service/api'


export default function CadastrarTarefa() {


    const useStyles = makeStyles((theme) => ({
        container: {
            backgroundColor: '#303030',

            height: '100vh'

        },
        paper: {
            flexDirection: 'row',
            alignItems: 'center',
            justifycontent: 'space-between',
            backgroundColor: '#303030',
            display: 'flex',
            overflowY: 'hidden',

        },
        form: {



        },
        submit: {
            background: '#FE963D',
            borderRadius: '10px',
            width: '90px',
            height: '40px',
            margin: '20px',
            justifyContent: 'center'


        },

        texto: {
            color: '#FE963D'

        },

        input: {
            color: 'white'
        }






    }));

    const classes = useStyles();

    return (
        <div className={classes.container}>


            <form className={classes.form} noValidate onSubmit={CadastrarTarefa}>
                <TextField

                    fullWidth
                    type="text"
                    id="descricao"
                    label="Descrição da Tarefa"
                    placeholder="Breve descrição da Tarefa"
                    margin="normal"
                    InputProps={{
                        className: classes.input,
                    }}
                    InputLabelProps={{
                        className: classes.texto,
                    }}

                >
                </TextField >

                <TextField
                    type="text"
                    id="dataEntrega"
                    label="Data para Entrega"
                    placeholder="dd/mm/yyyy"
                    margin="normal"
                    InputProps={{
                        className: classes.input,
                    }}
                    InputLabelProps={{
                        className: classes.texto,
                    }}

                >
                </TextField>


            </form>

            <div className={classes.paper}>

                <Button
                    size="medium"
                    type="submit"
                    variant="contained"
                    color="primary"
                    className={classes.submit}>
                    Concluir
                    </Button>

                <Typography className={classes.texto} >
                    Atribuir á membro
                    </Typography>

            </div >

        </div >
    );

}