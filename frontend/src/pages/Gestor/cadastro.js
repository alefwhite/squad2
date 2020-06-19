import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';



const useStyles = makeStyles((theme) => ({
    container: {
        background: 'linear-gradient(180deg, #303030 0%, #000000 100%)',
        width: '100vw',
    },
    campos: {
        borderRadius: '20px',
        width: '77vw',
        background: '#FDFCFC',
        border: '2px solid #7A57EA',
        marginTop: '0px',
        marginBottom: '0px',

    },
    paper: {
        height: '100%',
        paddingTop: theme.spacing(12),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    form: {
        width: '77vw',
        height: '100vh'
    },
    submit: {
        background: '#FE963D',
        borderRadius: '10px',
        width: '180px',
        height: '40px',
        marginLeft: '60px',
        justifyContent: 'center',
        marginTop: '80px'
    },

    texto: {
        fontStyle: 'normal',
        fontWeight: '500',
        fontSize: '17px',
        lineHeight: '17px',
        paddingLeft: '20px'
    },

}));



function cadastrarUsuario() {
    alert("Cadastrando usuário");
}

export default function Cadastrar() {
    const classes = useStyles();



    return (
        <div className={classes.container}>
            <CssBaseline />
            <div className={classes.paper}>
                <form className={classes.form} noValidate>
                    <h2 className={classes.texto} style={{ color: '#7A57EA' }}>
                        Nome Completo
                    </h2>
                    <TextField className={classes.campos}
                        variant="outlined"
                        margin="normal"
                        required
                        id="nome"
                        label="Nome Completo"
                        name="nome"
                        autoComplete="name"
                        autoFocus
                    />
                    <h2 className={classes.texto} style={{ color: '#7A57EA' }}>
                        E-mail
                    </h2>
                    <TextField className={classes.campos}
                        variant="outlined"
                        margin="normal"
                        required
                        id="email"
                        label="E-mail"
                        name="email"
                        autoComplete="email"
                        autoFocus
                    />
                    <h2 className={classes.texto} style={{ color: '#7A57EA' }}>
                        CPF
                    </h2>
                    <TextField className={classes.campos}
                        variant="outlined"
                        margin="normal"
                        required
                        id="cpf"
                        label="CPF"
                        name="cpf"
                        autoFocus
                    />
                    <h2 className={classes.texto} style={{ color: '#7A57EA' }}>
                        Senha
                    </h2>
                    <TextField className={classes.campos}
                        variant="outlined"
                        margin="normal"
                        required
                        name="senha"
                        label="Senha"
                        type="password"
                        id="senha"
                        autoComplete="new-password"
                    />
                    <h2 className={classes.texto} style={{ color: '#7A57EA' }}>
                        Confirme sua senha
                    </h2>
                    <TextField className={classes.campos}
                        variant="outlined"
                        margin="normal"
                        required
                        name="confirmaSenha"
                        label="Confirmar Senha"
                        type="password"
                        id="password"
                        autoComplete="new-password"
                    />

                    <Button
                        onClick={() => cadastrarUsuario()}
                        size="medium"
                        type="submit"
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Cadastrar
                    </Button>

                </form>
            </div>
        </div >
    );
}