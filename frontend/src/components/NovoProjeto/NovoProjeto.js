import React, {useState} from 'react';
import './NovoProjeto.css';
import Input from '../Input/Input';
import Botao from '../Botao/Botao';
import InputData from '../InputData/InputData';
import {format} from 'date-fns'

const estilo = {
    input:[
        {marginLeft:'2%', marginRight:'60%',marginTop:'0px'},
        {marginLeft:'2%'}
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

function NovoProjeto(){
    let nome,descricao;
    let [inicio,setInicio] = useState(new Date());
    let [fim,setFim] = useState(new Date());

    function handlePreencher(evento,espaco){
        switch(espaco){
            case "nome":{
                nome = evento.target.value;
                break;
            }
            case "descricao":{
                descricao = evento.target.value;
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
        }
        
    }

    function enviar(x){
        x.preventDefault();
        inicio =  format(inicio,"dd/MM/yyyy");
        fim =  format(fim,"dd/MM/yyyy");
        
        let data = {
            nome,
            descricao,
            inicio,
            fim
        }


    }

    return(
        <div className="container3">
            <form className='forms' onSubmit={enviar}>
           
                <p style={estilo.p}>Nome do projeto</p>
          
                <p style={estilo.espacoCampo}><Input  funcao={(evento)=>handlePreencher(evento,"nome")} width="45vw" variant="standard"/></p>

                <p style={estilo.espacoCampo}><InputData value={inicio}  funcao={(evento)=>handlePreencher(evento,"inicio")} style={estilo.input[0]} label="Início"/>
                <InputData value={fim} funcao={(evento)=>handlePreencher(evento,"fim")} style={estilo.input[1]} label="Fim"/></p>

                <p style={estilo.p}>Descrição do projeto</p>

                <p style={estilo.espacoCampo}><Input funcao={(evento)=>handlePreencher(evento,"descricao")} multiline="false" width="35vw"/></p>

                <p style={{textAlign:'center'}}><Botao children="CONCLUIR" width="90px"></Botao></p>
                
                
            </form>
        </div>
    )
}

export default NovoProjeto;