import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme) => ({
    container: {
        background: 'linear-gradient(180deg, #303030 0%, #000000 100%)',
    },
    campos: {
        borderRadius: '20px',
        background: 'white',
        border: '2px solid #7A57EA',
        marginTop: theme.spacing(5),
    },

    paper: {
        height: '100%',
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },


    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        background: '#FE963D',
        borderRadius: '10px',
        width: '180px',
        height: '40px',
        margin: theme.spacing(5, 10),
    },
}));

export default function Cadastrar() {
    const classes = useStyles();

    return (

        <Container className={classes.container} component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <form className={classes.form} noValidate>
                    <TextField className={classes.campos}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="nome"
                        label="Nome Completo"
                        name="nome"
                        autoComplete="name"
                        autoFocus
                    />
                    <TextField className={classes.campos}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="E-mail"
                        name="email"
                        autoComplete="email"
                        autoFocus
                    />
                    <TextField className={classes.campos}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="cpf"
                        label="CPF"
                        name="cpf"
                        autoFocus
                    />
                    <TextField className={classes.campos}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="senha"
                        label="Senha"
                        type="password"
                        id="senha"
                        autoComplete="new-password"
                    />
                    <TextField className={classes.campos}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="confirmaSenha"
                        label="Confirmar Senha"
                        type="password"
                        id="password"
                        autoComplete="new-password"
                    />
                    <Button
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
        </Container>
    );
}