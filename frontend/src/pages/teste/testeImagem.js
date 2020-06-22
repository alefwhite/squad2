import React from 'react';
import UploadImagem from '../../components/uploadImagem/UploadImagem';
import Membro from '../../components/Membro/Membro';
import NovoProjeto from '../../components/NovoProjeto/NovoProjeto';

export default function uploadImagem(){
    return(
        <>
        <UploadImagem></UploadImagem>
            <Membro></Membro>
            <NovoProjeto></NovoProjeto>
        </>
    )
}