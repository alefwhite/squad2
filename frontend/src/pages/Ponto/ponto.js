import React, {useEffect, useState} from 'react';
import WorkRoundedIcon from '@material-ui/icons/WorkRounded';
import LocalDiningRoundedIcon from '@material-ui/icons/LocalDiningRounded';
import TransferWithinAStationRoundedIcon from '@material-ui/icons/TransferWithinAStationRounded';
import EmojiPeopleRoundedIcon from '@material-ui/icons/EmojiPeopleRounded';
import {Card} from '@material-ui/core/';
import {format} from 'date-fns';
import CardContent from '@material-ui/core/CardContent';
import api from '../../service/api'

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
        
    },[])

    return(
        <div className="container">
            <Card style={{borderRadius:'20px',marginTop:'20px'}}>
                <CardContent style={{minWidth:'250px'}} className="card">
                    <div>
                      <p style={{color:'#FE963D', marginBottom:'20px'}}><WorkRoundedIcon/></p>

                      <p style={{color:'#FE963D', marginBottom:'20px'}}><LocalDiningRoundedIcon/></p>

                      <p style={{color:'#FE963D', marginBottom:'20px'}}><TransferWithinAStationRoundedIcon/></p>

                      <p style={{color:'#FE963D'}}><EmojiPeopleRoundedIcon/></p>

                    </div>
                </CardContent>
            </Card>
             {
            
            ponto && ponto.map((ponto)=>{
                let x = format(new Date(),"yyyy-dd-MM")
                console.log(`ponto:${ponto.data_ponto}   x = ${x}`);
                if(ponto.data_ponto === x){
                    
                    return <div className="container">
                        <Card style={{borderRadius:'20px',marginTop:'20px'}}>
                        <CardContent style={{minWidth:'250px'}} className="card">
                            <div>
                              <p style={{color:'#FE963D', marginBottom:'20px'}}><WorkRoundedIcon/></p>
        
                              <p style={{color:'#FE963D', marginBottom:'20px'}}><LocalDiningRoundedIcon/></p>
        
                              <p style={{color:'#FE963D', marginBottom:'20px'}}><TransferWithinAStationRoundedIcon/></p>
        
                              <p style={{color:'#FE963D'}}><EmojiPeopleRoundedIcon/></p>
        
                            </div>
                        </CardContent>
                    </Card>
                </div>
                }
            })
        }
        </div>
       
    )
}