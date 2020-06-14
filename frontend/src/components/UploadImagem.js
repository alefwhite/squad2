import React, { useState }  from 'react'
import ReactCrop from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css';
import './UploadImagem.css'

export default function UploadImagem(){
    const [imagem, setImagem] = useState(null);
    const [crop, setCrop] = useState({ aspect: 1 /1 , unit: '%',width: 15,height: 15, x: 2, y: 2 });
   
    function handleImagem(event){
      const img = event.target.files

      if(img && img.length >0){
          const reader = new FileReader();
          reader.addEventListener("load",()=>{
              const resultado = reader.result;
              setImagem(resultado);
          })
          reader.readAsDataURL(img[0]);
      }
    }

    function corte(newCrop){
        if(crop.width<=307 && crop.height<=307){
        setCrop(newCrop);
        console.log(newCrop);
        }
    }
    
    return(
        <>
            <p></p>
            <label className="uploadLabel">
                Selecione a imagem
                <input type="file" className="upload" multiple={false}  onChange={(event)=>handleImagem(event)}></input>
            </label>
        <p>a</p>
        <p>a</p>
            <ReactCrop src={imagem} className="ReactCrop--circular-crop" crop={crop} onChange={newCrop => corte(newCrop)}/>
            
        </>
    )
}