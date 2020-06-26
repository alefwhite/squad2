import React from 'react'
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Input from '../../components/Input/Input';

import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        padding: "30px",
        boxShadow: "-1px 4px 16px 2px rgba(0,0,0,0.48)"        
    },
    titlePage: {
        color: "#FE963D",
        fontWeight: "200",
        marginBottom: "20px"
    },
    formControl: {
        maxWidth: 150,
    },
    selectEmpty: {
        minWidth: 150,
    },
    campos: {
       
        '& label.Mui-focused': {
            color: '#FE963D',
            fontWeight:'bold',
        
        }, 
        '& .MuiFormLabel-root':{
            color:'#7A57EA'
        },

        '& .MuiInputLabel-outlined.MuiInputLabel-shrink': {
            color: '#7A57EA',
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
                width: '150px'
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
    const [cargo, setCargo] = React.useState('');    

    const handleChange = (event) => {
    setCargo(event.target.value);
    };

    

    return (
        <>  
            <Container maxWidth="lg" style={{background: "#303030"}} className={classes.root} wrap>

                {/* <Grid item xs={12}>
                    <h1 className={classes.titlePage}>Meus Dados</h1>
                </Grid>

                <Grid container spacing={3} className={classes.GridBottom}>
                    <Grid item xs spacing={3}>
                        <FormControl variant="outlined" className={clsx(classes.formControl, classes.campos)}>
                                <InputLabel htmlFor="outlined-age-native-simple">Cargo</InputLabel>
                                <Select
                                    className={classes.campos}
                                    native
                                    value={cargo}
                                    onChange={handleChange}
                                    label="cargo"
                                    inputProps={{
                                        name: 'age',
                                        id: 'outlined-age-native-simple',
                                    }}
                                >
                                <option aria-label="None" value="" />
                                <option value={10}>Ten</option>
                                <option value={20}>Twenty</option>
                                <option value={30}>Thirty</option>
                                </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs spacing={3}>
                        <Input type="text" name="nome"  value="teste" label="Nome completo"/>
                    </Grid>
                    <Grid item xs spacing={3}>
                        <Input type="text" name="nome" variant="standard" label="Nome social"/>
                    </Grid>
                    <Grid item xs spacing={3}>
                        <Input type="text" name="nome" variant="standard"label="E-mail"/>
                    </Grid>                   
                </Grid>
                   
                <Grid container spacing={3} className={classes.GridBottom}>
                    <Grid item xs spacing={3}>
                        <Input type="text" name="nome"  value="teste" label="Cpf"/>
                    </Grid>
                    <Grid item xs spacing={3}>
                        <Input type="text" name="nome" variant="standard" label="Senha antiga"/>
                    </Grid>
                    <Grid item xs spacing={3}>
                        <Input type="text" name="nome" variant="standard" label="Senha"/>
                    </Grid>
                    <Grid item xs spacing={3}>
                        <Input type="text" name="nome" variant="standard" label="Confirmar senha"/>
                    </Grid>
                </Grid> */}

                {/* Grid Forma 2 */}
                <Grid item xs={12}>
                    <h1 className={classes.titlePage}>Dados Cadastrados</h1>
                </Grid>
                <Grid container spacing={1}>
                    <Grid container item xs={12} spacing={3} justify="space-around" alignItems="center" className={classes.GridBottom}>
                        <Grid item md="auto">
                            <Input type="text" name="nome"  value="teste" label="Nome completo"/>
                        </Grid>
                        <Grid item md="auto">
                            <Input type="text" name="nome"  value="teste" label="Nome social"/>
                        </Grid>
                        <Grid item md="auto">
                            <Input type="text" name="nome"  value="teste" label="E-mail"/>
                        </Grid>
                        <Grid item md="auto">
                            <Input type="text" name="nome"  value="teste" label="Cpf"/>
                        </Grid>
                   </Grid>
                    <Grid container item xs={12} spacing={3} justify="space-around" alignItems="center" className={classes.GridBottom}>
                        <Grid item md="auto">
                            <Input type="text" name="nome"  value="teste" label="Senha antiga"/>
                        </Grid>
                        <Grid item md="auto">
                            <Input type="text" name="nome"  value="teste" label="Nova senha"/>
                        </Grid>
                        <Grid item md="auto">
                            <Input type="text" name="nome"  value="teste" label="Confirmar senha"/>
                        </Grid>                        
                        <Grid item md="auto">
                            <FormControl  className={clsx(classes.formControl, classes.campos)}>
                                    <InputLabel htmlFor="outlined-age-native-simple">Cargo</InputLabel>
                                    <Select
                                        className={classes.campos}
                                        native
                                        value={cargo}
                                        onChange={handleChange}
                                        label="cargo"
                                        inputProps={{
                                            name: 'age',
                                            id: 'outlined-age-native-simple',
                                        }}
                                    >
                                    <option aria-label="None" value="" />
                                    <option value={10}>Ten</option>
                                    <option value={20}>Twenty</option>
                                    <option value={30}>Thirty</option>
                                    </Select>
                            </FormControl>
                        </Grid> 
                   </Grid>                                     
                </Grid>
            </Container>
        </>
    )
};

export default MinhasInformacoes;