import React, { useState } from 'react';
import './login.css';
import api from '../../service/api';
import {useHistory} from 'react-router-dom';
import Input from '../../components/Input/Input';
import Botao from '../../components/Botao/Botao';


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
      const response = await api.post("/session",data)
      const {user,token} = response.data;
      
      if(response.status===200){
        localStorage.setItem("nome",user.nome);
        localStorage.setItem("token",token);  

        history.push("/teste");
      }
    } 
    catch (error) {
      console.log(`erro:${error}`);
    }
  
  }

  return (

    <div className="container">
      <form className="form" onSubmit={Logar}>
        <p style={{ color: "#7A57EA", marginBottom:'20px' }}>E-mail</p>
       
       <p style={{marginBottom:'20px'}}>
         <Input 
          id="email"  
          width="250px" 
         
          name="email" 
          autoComplete="email" 
          variant="outlined" funcao={(evento)=>handlePreencher(evento,"email")}>
         </Input>
       </p>

        <p style={{ color: "#7A57EA", marginBottom:'20px' }}>Senha</p>
    
        <p style={{marginBottom:'20px' }}>
          <Input  
            type="password" 
            style={{marginBottom:'20px' }} 
            width="250px" 
            id="email" 
        
            name="senha" autoComplete="password" 
            variant="outlined" 
            funcao={(evento) => handlePreencher(evento, "senha")}>
          </Input>
        </p>

        <p style={{ textAlign: "center" }}>
        <Botao type="submit" children="ENTRAR"></Botao>
        </p>
    
        <p style={{ color: "white", textAlign: "center" }}>Ainda não possui cadastro? <a href="/login">clique aqui</a></p>
        
      </form>
      
    </div>
  )
}