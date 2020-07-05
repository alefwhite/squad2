import React, {useEffect, useState} from 'react';
import WorkRoundedIcon from '@material-ui/icons/WorkRounded';
import LocalDiningRoundedIcon from '@material-ui/icons/LocalDiningRounded';
import TransferWithinAStationRoundedIcon from '@material-ui/icons/TransferWithinAStationRounded';
import EmojiPeopleRoundedIcon from '@material-ui/icons/EmojiPeopleRounded';
import {Card} from '@material-ui/core/';
import {format} from 'date-fns';
import CardContent from '@material-ui/core/CardContent';
import api from '../../service/api'
import Botao from '../../components/Botao/Botao';

export default function Ponto(){
    const [ponto,setPonto] = useState([]);
    
    const pontos = async () =>{
       await api.get('/timesheet')
        .then(response => {
            console.log(response.data);
            setPonto(response.data);
            let x = format(new Date(),"yyyy-MM-dd");
        })
    }
    useEffect(()=>{
        pontos();
        
    },[]);

    const batePonto = async () =>{
        await api.put('/timesheet')
        .then(response => {
            console.log(response);
            pontos();
        })
        
    }

    return(
        <div className="container">
            <p style={{color:'#FE963D',fontWeight:'bold',fontSize:'40px',marginRight:"15%", marginTop:'20px'}}>Horários</p>
             {
            ponto && ponto.map((ponto)=>{
                let x = format(new Date(),"yyyy-dd-MM");
                let y = format(new Date(ponto.data_ponto),"yyyy-dd-MM");
                console.log(`ponto:${y}   x = ${x}`);
                if(y === x){         
                    return <Card style={{borderRadius:'20px',marginTop:'20px' }} key={ponto.id_timesheet}>
                        <CardContent style={{minWidth:'250px'}} className="card">
                            <div>
                              <p style={{color:'#FE963D', marginBottom:'20px'}}><WorkRoundedIcon/>{ponto.entrada}</p>
                              <p style={{color:'#FE963D', marginBottom:'20px'}}><LocalDiningRoundedIcon/>{ponto.almoco_ida}</p>
                              <p style={{color:'#FE963D', marginBottom:'20px'}}><TransferWithinAStationRoundedIcon/>{ponto.almoco_volta}</p>
                              <p style={{color:'#FE963D'}}><EmojiPeopleRoundedIcon/>{ponto.saida}</p>
                              <h1 style={{textAlign:'right'}}><Botao children="Ponto" funcao={batePonto}/></h1>
                            </div>
                        </CardContent>
                    </Card>
                }
            })
        }

        <p style={{color:'#FE963D',fontWeight:'bold',fontSize:'40px',marginRight:"15%", marginTop:'20px'}}>Tarefas</p>
        </div>
       
    )
}