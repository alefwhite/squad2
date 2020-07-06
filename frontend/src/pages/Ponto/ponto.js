import React, {useEffect, useState} from 'react';
import WorkRoundedIcon from '@material-ui/icons/WorkRounded';
import LocalDiningRoundedIcon from '@material-ui/icons/LocalDiningRounded';
import TransferWithinAStationRoundedIcon from '@material-ui/icons/TransferWithinAStationRounded';
import EmojiPeopleRoundedIcon from '@material-ui/icons/EmojiPeopleRounded';
import {Card} from '@material-ui/core/';
import {format} from 'date-fns';
import CardContent from '@material-ui/core/CardContent';
import api from '../../service/api';
import Botao from '../../components/Botao/Botao';
import {parseJWT} from '../../service/parseJWT';
import {makeStyles} from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import './ponto.css';
import { ToastContainer } from 'react-toastify';


const useStyles = makeStyles((theme)=>({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }
}))

export default function Ponto(){
    const [ponto,setPonto] = useState([]);
    const [tarefalist,setTarefalist] = useState([]);
    const [open, setOpen] = useState(false);
   
    const [desc,setDesc] = useState("");
    const classes = useStyles();
    
    const pontos = async () => {
       await api.get('/timesheet')
        .then(response => {
            console.log(response.data);
            setPonto(response.data);
            //let x = format(new Date(),"yyyy-MM-dd");
        })
    }

    const tarefas = async () => {
        console.log(parseJWT().id_tipousuario);
        parseJWT().id_tipousuario === 2 ?
        
        await api.get("/tarefa")
        .then(response => {
            setTarefalist(response.data);
            console.log(response.data);
        })
        :
        await api.get("/usuariotarefa")
        .then(response => {
            setTarefalist(response.data);
        })
    }
    
    useEffect(()=>{
        pontos();
        tarefas();
    },[]);

    const batePonto = async () =>{
        await api.put('/timesheet')
        .then(response => {
            console.log(response);
            pontos();
        })
        
    }
    const handleOpen = (index) => {
        setOpen(true);
        console.log(index);
        setDesc(tarefalist[index].descricao)
        console.log(tarefalist[index].descricao);
      };
    
      const handleClose = () => {
        setOpen(false);
      };
    const detalhes =(
      
        <Card style={{borderRadius:'20px',marginTop:'20px' }} >
            <CardContent style={{minWidth:'250px',display:'flex',justifyContent:'center',alignItems:'center'}} className="card">
                <p style={{color:'#FE963D', marginBottom:'20px', }} >{desc}</p>
            </CardContent>
        </Card>
    )
    return(
        <div className="container">
            <p style={{color:'#FE963D',fontWeight:'bold',fontSize:'40px',marginRight:"15%", marginTop:'20px'}}>Horários</p>
             {
            ponto && ponto.map((ponto) => {
                let x = format(new Date(),"yyyy-dd-MM");
                let y = format(new Date(ponto.data_ponto),"yyyy-dd-MM");
                console.log(`ponto:${y}   x = ${x}`);
                if(y === x) {         
                    return <Card style={{borderRadius:'20px',marginTop:'20px' }} key={ponto.id_timesheet}>
                        <CardContent style={{minWidth:'250px'}} className="card">
                            <div>
                                <div style={{display:'flex',alignItems:'center'}}>
                                    <spam style={{marginBottom:'20px',color:'#FE963D'}}><WorkRoundedIcon/></spam>
                                    <p style={{color:'#FE963D', marginBottom:'20px',justifySelf:'center'}}>
                                        {ponto.entrada}
                                    </p>
                              </div>

                              <div style={{display:'flex',alignItems:'center'}}>
                                <spam style={{marginBottom:'20px',color:'#FE963D'}}><LocalDiningRoundedIcon/></spam>
                                <p style={{color:'#FE963D', marginBottom:'20px'}}>{ponto.almoco_ida}</p>
                              </div>
                              
                              <div style={{display:'flex',alignItems:'center'}}>
                                <spam style={{marginBottom:'20px',color:'#FE963D'}}><TransferWithinAStationRoundedIcon/></spam>
                                <p style={{color:'#FE963D', marginBottom:'20px'}}>{ponto.almoco_volta}</p>
                              </div>
                              
                              <div style={{display:'flex',alignItems:'center'}}>
                                <spam style={{marginBottom:'20px',color:'#FE963D'}}><EmojiPeopleRoundedIcon/></spam>
                                <p style={{color:'#FE963D', marginBottom:'20px'}}>{ponto.saida}</p>
                              </div>
                              <h1 style={{textAlign:'right'}}><Botao children="Ponto" funcao={batePonto}/></h1>
                            </div>
                        </CardContent>
                    </Card>
                }
                else {
                    return <> </>
                }    
                
            })
        }
    
        <p style={{color:'#FE963D',fontWeight:'bold',fontSize:'40px',marginRight:"15%", marginTop:'20px'}}>Tarefas</p>
        <Card style={{borderRadius:'20px',marginTop:'20px' }} >
            <CardContent style={{minWidth:'250px'}} className="card">
                <p className="tarefa"> 
                
                </p>
                {
                    tarefalist && tarefalist.map((tarefalist,ind)=>{
                        let k = format(new Date(tarefalist.prazo),"dd/MM/yyyy")
                       return  <p className="tarefa" style={{cursor:'pointer'}} key={tarefalist.id_tarefa} onClick={()=>handleOpen(ind)}>
                           <spam style={{color:'#FE963D', marginBottom:'20px', }} >{tarefalist.nome}</spam>
                            
                           <spam style={{color:'#7A57EA', textAlign:'center'}}>{k}</spam>
                           
                           <spam style={{color:'#FE963D',textAlign:'right'}}>{tarefalist.funcionario}</spam>
                           
                       </p>
                    })
                }

            </CardContent>
        </Card>
        <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        className={classes.modal}
      >
        {detalhes}
      </Modal>
      <ToastContainer/>
    </div>       
    )
}