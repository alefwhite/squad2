import React, { useState } from 'react';
import './login.css';
import api from '../../service/api';
import {useHistory} from 'react-router-dom';
import Input from '../../components/Input/Input';
import Botao from '../../components/Botao/Botao';
import {parseJWT}  from '../../service/parseJWT';
import { toast, ToastContainer } from 'react-toastify';


export default function Login() {
  const [email,setEmail] = useState("");
  const [senha,setSenha] = useState("");
  const history = useHistory();

  function handlePreencher(evento,espaco) {
    if(espaco==="email"){
      setEmail(evento.target.value);
      console.log(email);
    }
    if(espaco==="senha"){
      
      setSenha(evento.target.value);
      console.log(senha);
    }
  }

  async function Logar(e){
    e.preventDefault();
    var data = {
      senha,
      email
    }
    console.log("TESTE");
    try {
      const response = await api.post("/session", data)
      const {user,token} = response.data
      
      
      if(response.status === 200){
          localStorage.setItem("nome", user.nome_social);
          localStorage.setItem("token", token);
          toast.success("Login efetuado com sucesso!");          
          
          console.log(parseJWT());
          console.log("Tipo de usuário: ", parseJWT().id_tipousuario);
          setTimeout(() => {
            history.push("/dashboard");
          }, 4000);

      }
    } 
    catch (error) {
      toast.error("Erro ao efetuar login!");
    }
  
  }

  return (

    <div className="container">
      <form className="form" onSubmit={Logar}>
        <p style={{ color: "#7A57EA"}}>E-mail</p>
       
       <h1 style={{marginBottom:'20px', marginTop:'20px'}}>
          <Input 
          id="email"
          width="250px" 
          required={true} 
          name="email" 
          autoComplete="email" 
          variant="outlined" 
          funcao={(evento)=>handlePreencher(evento,"email")}></Input>
        </h1>

        <p style={{ color: "#7A57EA"}}>Senha</p>

        <h1 style={{marginBottom:'20px', marginTop:'20px'}}>
          <Input 
          required={true}
          width="250px" 
          type="password" 
          id="senha"
          name="senha" 
          autoComplete="password" 
          variant="outlined"
          funcao={(evento) => handlePreencher(evento, "senha")}></Input>
        </h1>
        <h1 style={{ textAlign: "center", marginBottom:'20px' }}>
        <Botao type="submit" children="ENTRAR"></Botao>
        </h1>
    
        <p style={{ color: "white", textAlign: "center" }}>Ainda não possui cadastro? <a href="/cadastrogestor">clique aqui</a></p>
        
      </form>
      <ToastContainer/>
    </div>
  )
}