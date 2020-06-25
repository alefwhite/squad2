import React from 'react';
import './CardProjeto.css'
import {Card} from '@material-ui/core/';
import CardContent from '@material-ui/core/CardContent';
import CreateRoundedIcon from '@material-ui/icons/CreateRounded';
import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded';

export default function Projeto(){

    function editar(){
        console.log('teste');
    }
    function deletar(){
        console.log('teste2')
    }
    return(
        <div className="container">
            <Card style={{borderRadius:'20px'}}>
                <CardContent className="card">
                    <div>
                        <p className="envolve">

                            <p className="texto">NOME PROJETO </p>

                            <p style={{color:'#FE963D'}}>
                                <CreateRoundedIcon style={{cursor:'pointer'}} onClick={editar}/>
                                <DeleteRoundedIcon style={{marginLeft:"20px", cursor:'pointer'}} onClick={deletar}/>
                            </p>
                        </p>
                        <p style={{color:'#7A57EA', fontSize:'20px', marginTop:'20px'}}>Descrição do projeto</p>
                        <p style={{color:'#7A57EA',fontSize:'17px', marginTop:'40px'}}><i style={{color:'#FE963D',fontSize:'17px'}}>Inicio:</i> 20/04/2020 </p>
                        <p style={{color:'#7A57EA',fontSize:'17px'}}><i style={{color:'#FE963D',fontSize:'17px'}}>Término:</i> 20/06/2020</p>
             
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}