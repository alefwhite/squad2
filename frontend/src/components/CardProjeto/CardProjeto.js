import React from 'react';
import './CardProjeto.css'
import {Card} from '@material-ui/core/';
import CardContent from '@material-ui/core/CardContent';
import CreateRoundedIcon from '@material-ui/icons/CreateRounded';
import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded';

function CardProjeto(props){

    function editar(){
        console.log('teste');
    }
    function deletar(){
        console.log('teste2')
    }
    return(
       
            <Card style={{borderRadius:'20px',marginTop:'20px'}}>
                <CardContent className="card">
                    <div>
                        <p className="envolve">

                            <p className="texto">{props.nome}</p>

                            <p style={{color:'#FE963D'}}>
                                <CreateRoundedIcon style={{cursor:'pointer'}} onClick={editar}/>
                                <DeleteRoundedIcon style={{marginLeft:"20px", cursor:'pointer'}} onClick={deletar}/>
                            </p>
                        </p>
                        <p style={{color:'#7A57EA', fontSize:'20px', marginTop:'20px'}}>{props.descricao}</p>
                        <p style={{color:'#7A57EA',fontSize:'17px', marginTop:'40px'}}><i style={{color:'#FE963D',fontSize:'17px'}}>Inicio:</i> {props.inicial} </p>
                        <p style={{color:'#7A57EA',fontSize:'17px'}}><i style={{color:'#FE963D',fontSize:'17px'}}>Término:</i> {props.final}</p>
             
                    </div>
                </CardContent>
            </Card>
   
    )
}

export default CardProjeto;