import React, { useState }  from 'react'
import ReactCrop from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css';
import './UploadImagem.css'
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import api from '../../service/api';
import '../../index.css'
import ImageIcon from '@material-ui/icons/Image';
import { toast }from 'react-toastify';

export default function UploadImagem(props){
    const [imagem, setImagem] = useState(null);
    const [img, setImg] = useState(null);
    const [cropImg,setCropImg] = useState(null);
    const [crop, setCrop] = useState({ aspect: 1/1 , unit: '%', width: 1, height: 1, x: 2, y: 2 });
    const [open,setOpen] = useState(false);
    const [fileName, setFileName] = useState('');
    const [profile, setProfile] = useState('');

    const useStyles = makeStyles((theme) => ({
        modal: {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        },
        paper: {
          backgroundColor: theme.palette.background.paper,
          border: '2px solid #000',
          boxShadow: theme.shadows[5],
          padding: theme.spacing(2, 4, 3),
        },
      }));
    
    const classes = useStyles();
    
    const EnviarImagem = async () => {
       let data = new FormData();
       console.log(profile)
       data.append("img_usuario", profile, fileName);

       const response = await api.post('/uploadusuario', data);

        if(response.status === 200) {
            toast.success("Imagem atualizada com sucesso!")
            props.funcao();
            setOpen(false);
        }
    };

    function handleImagem(event){
      const img = event.target.files;
        console.log("Imagem", img)

      if(img && img.length > 0) {
        setFileName(img[0].name);
        const reader = new FileReader();
        
        reader.addEventListener("load", () => {
            const resultado = reader.result;
            setImagem(resultado);
        });

        reader.readAsDataURL(img[0]);
        setOpen(true);

      }
      
    }
    
    function corte(newCrop){
        setCrop(newCrop);
        makeCrop();
    };

    //teste
    function load(img){
        setImg(img);
    }
    
    async function makeCrop() {
        if(img && crop.width && crop.height){
            let cropURL = await getCroppedImg(img,crop,"novo.jpeg");
            setCropImg(cropURL);
        }
    }

    function getCroppedImg(img,crop,fileName) {
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
        canvas.toBlob(blob => {
                if(!blob){
                    console.error("canvas vazio");
                    return;
                };

                blob.name= fileName;
                setProfile(blob);
                let x;
                window.URL.revokeObjectURL(x);
                x = window.URL.createObjectURL(blob);
                resolve(x);
            }, "image/jpeg")
        })
    }

    return(
        <>
            {/* <label className="uploadLabel">
                Selecione a imagem
                <input type="file" hidden className="upload" multiple={false}  onChange={(event)=>handleImagem(event)}></input>
            </label> */}
            <span  onClick={() => {
                let up = document.querySelector("#up");
                up.click();
            }}>
                <ImageIcon/>
            </span>
            <label className="labelUpload" htmlfor="up">
                Atualizar Foto
                <input type="file" hidden className="upload" multiple={false} id="up" onChange={(event)=>handleImagem(event)}></input>
            </label>
            {
                modal()
            }           
        </>
    )

    function modal(){    

        const handleClose = () => {
          setOpen(false);
        }
  
        return(
           
            <>  
             
                  <Modal
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="simple-modal-title"
                  aria-describedby="simple-modal-description"
                  className={classes.modal}
                  >
                    <div className="modal" style={{background: "#303030", boxShadow: "1px -4px 24px 3px rgba(0,0,0,0.38)", outline: "none", margin: "10px"}}>
                        <Grid container direction="row" justify="center" alignItems="center">
                        <ReactCrop src={imagem} onImageLoaded={load} className="ReactCrop--circular-crop imge" width="200px" height="200px" crop={crop} onChange={newCrop => corte(newCrop)}/>
                            <img src={cropImg} className="imgCrop" alt="Selecione uma imagem"/>                       
                        </Grid>
                        <Grid style={{marginTop: "20px", marginBottom: "20px"}} container direction="row" justify="space-around" alignItems="center" >
                            <button className="btn_sim" onClick={() => EnviarImagem()}>Confirmar</button>
                            <button className="btn_nao" onClick={() => handleClose()}>Cancelar</button>
                        </Grid>
                    </div>
                    
                  </Modal>
                    
           </>
        )
    
    }
}

