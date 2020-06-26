import React, { useState } from 'react';
import './login.css';
import api from '../../service/api';
import {useHistory} from 'react-router-dom';
import Input from '../../components/Input/Input';
import {parseJWT}  from '../../service/parseJWT';
import { toast } from 'react-toastify';


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
    
    try {
      const response = await api.post("/session", data)
      const {user,token} = response.data
      
      
      if(response.status === 200){
          localStorage.setItem("nome", user.nome);
          localStorage.setItem("token", token);         
          toast.success("Login efetuado com sucesso!");

          console.log(parseJWT());
          console.log("Tipo de usuário: ", parseJWT().id_tipousuario);

          history.push("/dashboard");
      }
    } 
    catch (error) {
      
    }
  
  }

  return (

    <div className="container">
      <form className="form" onSubmit={Logar}>
        <p style={{ color: "#7A57EA" }}>E-mail</p>
       
        <Input id="email"  label="Insira seu email" name="email" autoComplete="email" variant="outlined" funcao={(evento)=>handlePreencher(evento,"email")}></Input>
       

        <p style={{ color: "#7A57EA" }}>Senha</p>

        <Input  type="password" id="senha" label="Insira sua senha" name="senha" autoComplete="password" variant="outlined"funcao={(evento) => handlePreencher(evento, "senha")}></Input>

        <p style={{ textAlign: "center" }}>
        <button className="botao" type="submit">Entrar</button>
        </p>
    
        <p style={{ color: "white", textAlign: "center" }}>Ainda não possui cadastro? <a href="/cadastrogestor">clique aqui</a></p>
        
      </form>
      
    </div>
  )
}