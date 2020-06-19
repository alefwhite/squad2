import React, { useState } from 'react';
import './login.css';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';



export default function Login() {
  const [login, setLogin] = useState({email:"",senha:""})

  const StyledText = withStyles({
    root: {
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
    },
  })(TextField);
  
  

  function handlePreencher(evento,espaco) {
    if(espaco==="email"){
      setLogin({email:evento.target.value});
      console.log(login);
    }

  }

  return (



    <div className="container">
      <form className="form">
        <p style={{ color: "#7A57EA" }}>E-mail</p>


        <StyledText value={login.email}  id="outlined-basic" label="Insira seu e-mail" variant="outlined" onChange={(evento) => handlePreencher(evento, "email")}></StyledText>

        <input type="text"  onChange={(evento) => handlePreencher(evento, "email")}></input>

        <p style={{ color: "#7A57EA" }}>Senha</p>

        <StyledText id="outlined-basice"  type="password" label="Outlined" variant="outlined"></StyledText>
        <p style={{ textAlign: "center" }}>
          <button className="botao">Entrar</button>
        </p>
        <TextField value={login.email} id="outlined-basic" onChange={(evento) => handlePreencher(evento, "email")} label="Outlined" variant="outlined" />
        <p style={{ color: "white", textAlign: "center" }}>Ainda não possui cadastro? <a href="/login">clique aqui</a></p>
      </form>
    </div>
  )
}