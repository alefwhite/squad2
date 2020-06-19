import React, { useState } from 'react';
import './login.css';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import api from '../../service/api';
import {useHistory} from 'react-router-dom';

const useStyles = makeStyles((theme) => ({

  campos: {
     
      '& label.Mui-focused': {
        color: '#7A57EA',

      },    
      '& .MuiOutlinedInput-root': {
        '& fieldset': {
          border: "2px solid #7A57EA ",
          borderRadius: "20px",
          color: "red"
        },
        '&:hover fieldset': {
          borderColor: '#7A57EA',
        },
        '&.Mui-focused fieldset': {
          borderColor: '#7A57EA',
        },
        "& .MuiInputBase-input": {
          color: "#7A57EA",
          backgroundColor: "white",
          borderRadius: "22px",
          width: "250px"
        }
      },
    }
  ,
}));

export default function Login() {
  const classes = useStyles();
  const [email,setEmail] = useState("");
  const [senha,setSenha] = useState("");
  const history = useHistory();

  function handlePreencher(evento,espaco) {
    if(espaco==="email"){
      setEmail(evento.target.value);
    }
    if(espaco==="senha"){
      setSenha(evento.target.value);
    }
  }

  async function Logar(e){
    e.preventDefault();
    var data = {
      senha,
      email
    }
    
    try {
     const response = await api.post("/session",data)
      const {user,token} = response.data
      
      
      if(response.status===200){
        localStorage.setItem("nome",user.nome);
        localStorage.setItem("token",token);  
        history.push("/teste");
      }
    } 
    catch (error) {
      
    }
  
  }

  return (

    <div className="container">
      <form className="form" onSubmit={Logar}>
        <p style={{ color: "#7A57EA" }}>E-mail</p>
        <TextField className={classes.campos} variant="outlined"id="email" label="Insira seu e-mail" name="email" autoComplete="email" onChange={(evento) => handlePreencher(evento, "email")}/>

       

        <p style={{ color: "#7A57EA" }}>Senha</p>
        <TextField className={classes.campos} variant="outlined" type="password" id="senha" label="Insira sua senha" name="email" autoComplete="email" onChange={(evento) => handlePreencher(evento, "senha")}/>
       
        <p style={{ textAlign: "center" }}>
        <button className="botao" type="submit">Entrar</button>
        </p>
    
        <p style={{ color: "white", textAlign: "center" }}>Ainda não possui cadastro? <a href="/login">clique aqui</a></p>
        
      </form>
      
    </div>
  )
}