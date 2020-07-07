import React from 'react';
import './CardProjeto.css'
import {Card} from '@material-ui/core/';
import CardContent from '@material-ui/core/CardContent';
import CreateRoundedIcon from '@material-ui/icons/CreateRounded';
import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded';

function CardProjeto(props){

    return(
        <div style={{minWidth:'250px'}}>
            <Card style={{borderRadius:'20px',marginTop:'20px'}}>
                <CardContent style={{minWidth:'250px'}} className="card">
                    <div>
                        <div className="envolve">

                            <p className="texto">{props.nome}</p>

                            <p style={{color:'#FE963D'}}>
                                <CreateRoundedIcon style={{cursor:'pointer'}} onClick={props.editar}/>
                                <DeleteRoundedIcon style={{marginLeft:"20px", cursor:'pointer'}} onClick={props.deletar}/>
                            </p>
                        </div>
                        <p style={{color:'#7A57EA', fontSize:'20px', marginTop:'20px'}}>{props.descricao}</p>
                        <p style={{color:'#7A57EA',fontSize:'17px', marginTop:'40px'}}><i style={{color:'#FE963D',fontSize:'17px'}}>Inicio:</i> {props.inicial} </p>
                        <p style={{color:'#7A57EA',fontSize:'17px'}}><i style={{color:'#FE963D',fontSize:'17px'}}>Término:</i> {props.final}</p>
             
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default CardProjeto;