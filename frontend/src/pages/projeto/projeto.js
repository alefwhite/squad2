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
    
    const handleDeletar = async (index) =>{
        
        let k = [...estado];
        
        let data = estado[index].id_projeto

        try {
            const deletar = await api.delete(`/projeto/${data}`).then(response =>{
                console.log(response);
            })
        } catch (error) {
            console.log(error);
        }

        k.splice(index,1);
        console.log(index);
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
           <p style={{color:'#FE963D',fontWeight:'bold',fontSize:'40px',marginRight:"15%"}}>Projetos</p>
            {  
            estado.map((estado, ind)=>{
                let y = format(new Date(estado.data_inicial),"dd/MM/yyyy");
                let x = format(new Date(estado.data_final),"dd/MM/yyyy");
                
                return <CardProjeto 
                deletar={()=>handleDeletar(ind)}
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