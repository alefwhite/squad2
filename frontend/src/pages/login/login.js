import React,{useState} from 'react';
import './login.css';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';



export default function Login(){
  

    const StyledText = withStyles({
        root: {
          '& label.Mui-focused': {
            color: '#7A57EA',
            
          },
          '& .MuiInput-underline:after': {
            borderBottomColor: '#7A57EA',
          },
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              border:"2px solid #7A57EA",
              borderRadius:"20px",
              color:"red"
            },
            '&:hover fieldset': {
              borderColor: '#7A57EA',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#7A57EA',
            },
            "& .MuiInputBase-input": {
                color:"#7A57EA",
                backgroundColor:"white",
                borderRadius:"22px",
                width:"250px"
              }
          },
        },
      })(TextField);
      
      function preencher(evento,tipo){
          if(tipo=="email"){

          }
      }

    return(
      

     
        <div className="container">
            <form className="form">
            <p style={{color:"#7A57EA"}}>E-mail</p>
        
               
            <StyledText id="outlined-basic" label="Insira seu e-mail" variant="outlined"></StyledText>
           
            <p style={{color:"#7A57EA"}}>Senha</p>
          <StyledText  id="outlined-basic" onChange={(evento)=>preencher(evento,"email")} type="password" label="Outlined" variant="outlined"></StyledText>
            <p style={{textAlign:"center"}}> 
            <button className="botao">Entrar</button>
            </p>
            <p style={{color:"white",textAlign:"center"}}>Ainda não possui cadastro? <a href="/login">clique aqui</a></p>
            </form>
        </div>
    )
}