import React from 'react';
import './NovoProjeto.css';
import Input from '../Input/Input';
import Botao from '../Botao/Botao';
import InputData from '../InputData/InputData';

function NovoProjeto(){
    const teste = {justifySelf:'flexEnd'}
    return(
        <div className="container3">
            <form className='forms'>
                <p style={{color:"#FE963D"}}>Nome do projeto</p>
                <p><Input variant="standard" label="teste"></Input></p>
                <div className="X"><InputData className="X"></InputData> <InputData  ></InputData></div>
                <p className="teste"><Botao children="CONCLUIR"></Botao></p>
            </form>

        </div>
    )
}

export default NovoProjeto;