import React, { useState }  from 'react'
import ReactCrop from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css';
import './UploadImagem.css'
import Modal from '@material-ui/core/Modal';

export default function UploadImagem(){
    const [imagem, setImagem] = useState(null);
    const [img, setImg] = useState(null);
    const [cropImg,setCropImg] = useState(null);
    const [crop, setCrop] = useState({ aspect: 1/1 , unit: '%',width: 1,height: 1, x: 2, y: 2 });
    const [open,setOpen] = useState("false");
   
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
        setCrop(newCrop);
    }
    //teste
    function load(img){
        console.log(img);
        setImg(img);
    }
    
    async function makeCrop(){
        if(img && crop.width && crop.height){
            let cropURL = await getCroppedImg(img,crop,"novo.jpeg");
            setCropImg(cropURL);
        }
        
    }

    function getCroppedImg(img,crop,fileName){
    const canvas = document.createElement("canvas");
    const scaleX = img.naturalWidth / img.width;
    const scaleY = img.naturalHeight / img.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext("2d");

    ctx.drawImage(
      img,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );
    return new Promise((resolve, reject)=>{
        canvas.toBlob(blob=>{
            if(!blob){
                console.error("canvas vazio");
                return;
            }
            blob.name= fileName;
            let x;
            window.URL.revokeObjectURL(x);
            x = window.URL.createObjectURL(blob);
            resolve(x);
        }, "image/jpeg")
        })
    }
    return(
        <>
            <p></p>
            <label className="uploadLabel">
                Selecione a imagem
                <input type="file" className="upload" multiple={false}  onChange={(event)=>handleImagem(event)}></input>
            </label>
            {
                modal()
            }           
        </>
    )

    function modal(){
        const handleOpen = () => {
            setOpen(true);
          };
          const handleClose = () => {
            setOpen(false);

          }
        return(
            
            <>
                
                
                <div>
            <button type="button" onClick={handleOpen}>
                Open Modal
            </button>
        <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
         >
        
        <div>
        <ReactCrop src={imagem} onImageLoaded={load} className="ReactCrop--circular-crop" width="200px" height="200px" crop={crop} onChange={newCrop => corte(newCrop)}/>
                <img src={cropImg}></img>
        </div>
      </Modal>
    </div>
           </>
        )
    
    }
}

