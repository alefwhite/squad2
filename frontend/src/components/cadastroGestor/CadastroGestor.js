import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { orange } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
}));



export default function BasicTextFields() {
    const classes = useStyles();

    return (
        <div class ="formcontainer" align="center">
        <form className={classes.root} noValidate autoComplete="off">
            <TextField id="Nome Completo" label="Nome completo" variant="outlined" /><br/>
            <TextField id="outlined-basic" label="E-mail" variant="outlined" /><br/>
            <TextField id="outlined-basic" label="CPF" variant="outlined" /><br/>
            <TextField id="outlined-basic" label="Senha" variant="outlined" /><br/>
            <TextField id="outlined-basic" label="Confirme sua senha" variant="outlined" /><br/><br/>
            <Button variant="contained" color="secondary">
                Cadastrar
      </Button>
        </form>
        </div>
    );
}