import React, { useState, useEffect } from 'react'
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Input from '../../components/Input/Input';

import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import { toast } from 'react-toastify';

import api from '../../service/api';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        padding: "30px",
        boxShadow: "-1px 4px 16px 2px rgba(0,0,0,0.48)"        
    },
    alert: {
        width: '100%',
        '& > * + *': {
          marginTop: theme.spacing(2),
        },
    },
    titlePage: {
        color: "#7A57EA",
        fontWeight: "200",
        marginBottom: "20px"
    },
    formControl: {
        maxWidth: 190,
    },
    selectEmpty: {
        minWidth: 190,
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
    GridBottom: {
        marginBottom: "20px",
    }
    
}));
const MinhasInformacoes = () => {
    const classes = useStyles();

    const [estado, setEstado] = useState({estado: ''});

    const [senha_antiga, setSenhaAntiga] = useState('');    
    const [nova_senha, setNovaSenha] = useState('');    
    const [confirmar_senha, setConfirmarSenha] = useState('');

    const [cargos, setCargos] = useState([]);    
    const [novo_cargo, setNovoCargo] = useState("");    
    
    const handleChange = (event) => {
        setNovoCargo(event.target.value);
        console.log(novo_cargo)
    };

    const ListarInformacoes = async () => {

       await api.get("/gestor")
        .then( response => {
            setEstado(response.data);
            console.log(response.data)
        });
        
    }

    const ListarCargos = async () => {
        
        await api.get("/cargos")
        .then( response => {
            setCargos(response.data);
            console.log(response.data);
        })
    };

    const EditarInformacoes = async (e) => {
        e.preventDefault();
        console.log("teste")
        let data = {
            nome: estado.nome,
            nome_social: estado.nome_social, 
            email: estado.email, 
            cpf: estado.cpf, 
            senha_antiga,
            nova_senha, 
            confirmar_senha, 
            novo_cargo
        };

        await api.put("/gestor", data)
        .then( response => {
            if(response.status === 200) {
                console.log(response.data);
                toast.warning(response.data.mensagem);
            }
        })
        .catch( error => {
            console.log(error)
        })
    };

    useEffect(() => {
        ListarInformacoes();
        ListarCargos();
    },[]);

    

    return (
        <>  
            <Container maxWidth="lg" style={{background: "#303030"}} className={classes.root}>
                <form onSubmit={EditarInformacoes}>
                    <Grid item xs={12}>
                        <h1 className={classes.titlePage}>Dados Cadastrados</h1>
                    </Grid>
                    <Grid container spacing={1}>
                        <Grid container item xs={12} spacing={3} justify="space-around" alignItems="center" className={classes.GridBottom}>
                            <Grid item md="auto">
                                <Input type="text" nome="nome"  value={estado.nome || ''} labels="Nome completo" funcao={e => setEstado({...estado, nome: e.target.value})}/>
                            </Grid>
                            <Grid item md="auto">
                                <Input type="text" nome="social"  value={estado.nome_social || ''} labels="Nome social" funcao={e => setEstado({...estado, nome_social: e.target.value})}/>
                            </Grid>
                            <Grid item md="auto">
                                <Input type="text" nome="email"  value={estado.email || ''} labels="E-mail" funcao={e => setEstado({...estado, email: e.target.value})}/>
                            </Grid>
                            <Grid item md="auto">
                                <Input type="text" nome="cpf"  value={estado.cpf || ''} labels="Cpf" funcao={e => setEstado({...estado, cpf: e.target.value})}/>
                            </Grid>
                        </Grid>
                        <Grid container item xs={12} spacing={3} justify="space-around" alignItems="center" className={classes.GridBottom}>
                                <Grid item md="auto">
                                    <Input type="text" leitura={true} nome="cargo_atual"  value={estado.cargo || ''} labels="Cargo atual" />
                                </Grid>                        
                                <Grid item md="auto">
                                    <FormControl  className={clsx(classes.formControl, classes.campos)}>
                                            <InputLabel htmlFor="outlined-age-native-simple">Alterar Cargo</InputLabel>
                                            <Select            
                                                native
                                                onChange={handleChange}
                                                value={novo_cargo}
                                                label="cargo"
                                                inputProps={{
                                                    name: 'cargo',
                                                    id: 'outlined-age-native-simple',
                                                }}
                                            >
                                                <option aria-label="None" value="" />
                                                {
                                                    cargos.map((cargo) => {
                                                        return <option key={cargo.id_cargo} value={cargo.id_cargo}>{cargo.nome}</option>
                                                    })
                                                }
                                            </Select>
                                    </FormControl>
                                </Grid> 
                                <Grid item md="auto">
                                    <Input type="password" nome="senha_atinga"  value={senha_antiga || ''} labels="Senha antiga" funcao={e => setSenhaAntiga(e.target.value)}/>
                                </Grid>
                                <Grid item md="auto">
                                    <Input type="password" nome="nova_senha"  value={nova_senha || ''} labels="Nova senha" funcao={e => setNovaSenha(e.target.value)}/>
                                </Grid>
                        </Grid>
                        <Grid container item xs={12} spacing={3} justify="space-around" alignItems="center" className={classes.GridBottom} >                                     
                                    <Grid item md="auto">
                                        <Input type="password" nome="confirmar_senha"  value={confirmar_senha || ''} labels="Confirmar senha" funcao={e => setConfirmarSenha(e.target.value)}/>
                                    </Grid>                       
                        </Grid>            
                        <Grid container item xs={12} spacing={3} justify="space-around" alignItems="center" className={classes.GridBottom}>                                     
                                <Grid item md="auto">
                                    <button className="botao" type="submit">Alterar</button>
                                </Grid>                       
                        </Grid>            
                    </Grid>
                </form>
            </Container>
        </>
    )
};

export default MinhasInformacoes;