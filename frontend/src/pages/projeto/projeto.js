import React, {useEffect, useState} from 'react';
import CardProjeto from '../../components/CardProjeto/CardProjeto';
import api from '../../service/api';
import {format} from 'date-fns'

export default function Projeto(){
    const [estado,setEstado] = useState([]);

    const listar = async () =>{
        try {
            const projeto = await api.get('/projeto').then(response =>{
               setEstado(response.data);
               console.log(response.data);
            })
        } catch (error) {
            console.log(`erro:${error}`)
        }
        
    }

    useEffect(()=>{
        listar();
 
    },[]);

 
    var x=26*estado.length;

    return(
        <div className="container" style={{height:`${x}vh`,widht:'100vw'}}>

            {
            estado.map((estado)=>{
                let y = format(new Date(),"dd/MM/yyyy");
                let x = format(new Date(),"dd/MM/yyyy");
                console.log(estado.data_inicial)
                console.log('teste')
                return <CardProjeto 
                nome={estado.nome} 
                descricao={estado.descricao}
                inicial={x}
                final={y}
                ></CardProjeto>
            })
            }
     
        </div>
        
    )
}