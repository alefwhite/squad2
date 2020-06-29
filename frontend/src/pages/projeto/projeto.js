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
    
    const handleDeletar = (index) =>{
        let k = [...estado];
        k.splice(index,1);
        setEstado(k);
        console.log(estado);
    } 

    useEffect(()=>{
        listar();
 
    },[]);

 
    if(estado.length>5){
        var x=26*estado.length;
    }
    else{
        x=100;
    }

    return(
        <div className="container" style={{height:`${x}vh`,widht:'100vw'}}>

            {  
            estado.map((estado)=>{
                let y = format(new Date(estado.data_inicial),"dd/MM/yyyy");
                let x = format(new Date(estado.data_final),"dd/MM/yyyy");
           
                return <CardProjeto 
                deletar={(index)=>handleDeletar(index)}
                key={estado.id}
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