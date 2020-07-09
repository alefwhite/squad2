import React, {useState} from 'react';
import './NovoProjeto.css';
import Input from '../Input/Input';
import Botao from '../Botao/Botao';
import InputData from '../InputData/InputData';
import {format} from 'date-fns'
import api from '../../service/api';
import { toast } from 'react-toastify';


const estilo = {
    input:[
        {marginRight:'55%',marginTop:'0px'},
    
    ],
    p:{
        color:'#FE963D',
        marginLeft:'2%',
        fontSize:'25px'
    },

    espacoCampo:{
        marginLeft:'2%',
        marginBottom:'5%'
    }
    
}

function NovoProjeto({handleClose, setOpen}){
    const [nome,setNome]= useState('');
    const [descricao,setDescricao] = useState('');
    const [inicio,setInicio] = useState(new Date());
    const [fim,setFim] = useState(new Date());
    

    function handlePreencher(evento,espaco){
        switch(espaco){
            case "nome":{
                setNome(evento.target.value);
                break;
            }
            case "descricao":{
                setDescricao(evento.target.value);
                break;
            }
            case "inicio":{
                setInicio(evento);
                break;
            }
            case "fim":{
                setFim(evento);
                break;
            }
            default: 
                return 
        }
        
    }

   async function enviar(x){
        x.preventDefault();
        console.log(inicio);
        
     
        let data_inicial =  format(new Date(inicio), "yyyy-MM-dd");
        let data_final =  format(new Date(fim), "yyyy-MM-dd");
   
        
        let data = {
            nome,
            descricao,
            data_inicial,
            data_final
        }
        console.log(data)
       
        const response = await api.post("/projeto",data);

        if(response.status===200){
            toast.success(response.data.mensagem);
        } 
        
        handleClose();
      
    }

    return(
        <div className="container3">
            <form className='forms' onSubmit={enviar}>
                <div>
                <p style={estilo.p}>Nome do projeto</p>
                </div>
                <h1 style={estilo.espacoCampo}><Input  funcao={(evento)=>handlePreencher(evento,"nome")} width="45vw" variant="standard"/></h1 >
                <div style={{display:'flex', flexDirection:'row', justifyContent:'space-between', flexWrap:'wrap'}}>
                <h1 style={estilo.espacoCampo}><InputData value={inicio}  funcao={(evento)=>handlePreencher(evento,"inicio")} style={estilo.input[0]} label="Início"/></h1 >
                <h1 style={estilo.espacoCampo}><InputData value={fim} width='30vw' funcao={(evento)=>handlePreencher(evento,"fim")} style={estilo.input[1]} label="Fim"/></h1 >
                </div>
                <div>
                <p style={estilo.p}>Descrição do projeto</p>
                <h1  style={estilo.espacoCampo}><Input funcao={(evento)=>handlePreencher(evento,"descricao")} multiline="false" width="35vw"/></h1 >
                </div>
                <h1 style={{textAlign:'center'}}><Botao type="submit" children="CONCLUIR" width="90px"></Botao></h1>
            </form>
        </div>
    )
}

export default NovoProjeto;