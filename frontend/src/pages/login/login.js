import React, { useState, useEffect } from 'react';
import './login.css';
import api from '../../service/api';
import { useHistory } from 'react-router-dom';
import Input from '../../components/Input/Input';
import { parseJWT }  from '../../service/parseJWT';
import { toast, ToastContainer } from 'react-toastify';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  itemColor: {
      color: "#FE963D"
  },
  inboard: {
      color: "#7A57EA",
      fontSize: "2.5em",
      fontWeight: "bold !important",
      cursor: "pointer",
      textAlign: "center",
      padding: "10px"
  },

}));


export default function Login() {
  const [email,setEmail] = useState("");
  const [senha,setSenha] = useState("");
  const history = useHistory();
  const classes = useStyles();

  function handlePreencher(evento,espaco) {
    if(espaco === "email") {
      setEmail(evento.target.value);
      console.log(email);
    }
    
    if(espaco === "senha") {      
      setSenha(evento.target.value);
      console.log(senha);
    }
  }

  async function Logar(e) {
      e.preventDefault();

      let data = {
        senha,
        email
      }
    
    
      const response = await api.post("/session", data);      
            
      if(response.status === 200){
          const {user,token} = response.data;

          localStorage.setItem("nome", user.nome_social);
          localStorage.setItem("token", token);
          
          toast.success("Login efetuado com sucesso!");          
          
          console.log(parseJWT());
          console.log("Tipo de usuário: ", parseJWT().id_tipousuario);
          
          // Quando o usuário loga na aplicação ele inicia a entrada do timesheet
          await api.post("/timesheet");
          
          setTimeout(() => {
            history.push("/dashboard");
          }, 1200);

      }
  }

  useEffect(() => {
    document.title = "Login";

  }, []);

  return (
    <>
      <div className="container">

        <form className="form" onSubmit={Logar}>
          <div style={{textAlign: "center", fontSize: "2em", marginBottom: "50px"}}>
            <h1 className={classes.inboard}>In<span className={classes.itemColor}>Board</span></h1>          
          </div>

          <p style={{ color: "#7A57EA", marginBottom: "10px", alignSelf: "flex-start", marginLeft: "8px" }}>E-mail</p>
        
          <Input id="email" required={true} label="Insira seu email" name="email" autoComplete="email" variant="outlined" funcao={(evento)=>handlePreencher(evento,"email")}></Input>
        

          <p style={{ color: "#7A57EA", marginTop: "20px", marginBottom: "10px", alignSelf: "flex-start", marginLeft: "8px" }}>Senha</p>

          <Input required={true} type="password" id="senha" label="Insira sua senha" name="senha" autoComplete="password" variant="outlined"funcao={(evento) => handlePreencher(evento, "senha")}></Input>

          <p style={{ textAlign: "center", marginTop: "25px", marginBottom: "20px" }}>
            <button className="botao" type="submit">Entrar</button>
          </p>
      
          <p style={{ color: "white", textAlign: "center" }}>Ainda não possui cadastro? <a href="/gestor">clique aqui</a></p>
          
        </form>
        <ToastContainer/>
      </div>
    </> 
  )
}