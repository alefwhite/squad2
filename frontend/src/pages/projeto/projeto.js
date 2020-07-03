import React, {useEffect, useState} from 'react';
import CardProjeto from '../../components/CardProjeto/CardProjeto';
import api from '../../service/api';
import {format} from 'date-fns';
import Modal from '@material-ui/core/Modal';
import {makeStyles} from '@material-ui/core/styles';
import NovoProjeto from '../../components/NovoProjeto/NovoProjeto';
import AssignmentRoundedIcon from '@material-ui/icons/AssignmentRounded';

const useStyles = makeStyles((theme)=>({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
      formDel: {
        display: "flex",
        padding: "16px",
        marginTop: "5px",
        justifyContent: "space-between"
    },
    paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: "#303030",
        boxShadow: "-1px 4px 16px 2px rgba(0,0,0,0.48)",
        padding: theme.spacing(2, 4, 3),
        outline: 0,
        borderRadius: "3px"
    }
}))

export default function Projeto(){
    const [estado,setEstado] = useState([]);
    const [open, setOpen] = useState(false);
    const [open2, setOpen2] = useState(false);
    const [idprojeto, setIdprojeto] = useState(false);

    const classes = useStyles();

    

    const listar = async () =>{
        try {
            const token = localStorage.getItem("token");
            let config = {
                headers: {Authorization: "bearer " + token}
            }
            const projeto = await api.get('/projeto',config).then(response =>{    
                setEstado(response.data);
                console.log(response.data);

            })
        } catch (error) {
            console.log(`erro:${error}`)
        }
    }
    
    useEffect(()=>{
        listar();
    },estado);


    const handleDeletar = async () =>{
        
        let index = idprojeto;
        let k = [...estado];
        console.log(index)
        let data = estado[index].id_projeto

        try {
            const deletar = await api.delete(`/projeto/${data}`).then(response =>{
                console.log(`sucesso:${response}`);
            })
        } catch (error) {
            console.log(error);
        }
        k.splice(index,1);
        setEstado(k);
        handleClose2();
    } 

   const tm =() => {
       let x = estado? estado.length:1;
       if(x ===0){
           x=1;
       }
       x = x * 265;
       console.log(`X:${x}`);
        return(x);
    }


    const handleOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };

      const handleOpen2 = (index) => {
        setOpen2(true);
        setIdprojeto(index);
      };
    
      const handleClose2 = () => {
        setOpen2(false);
      };

      const modal =(
        <div  className={classes.paper}>
        <h2 style={{color: "#7A57EA", marginBottom: "11px", textAlign: "center"}} id="simple-modal-title">Tem certeza que você deseja excluir?</h2>
        <div id="simple-modal-description">
            <div className={classes.formDel} onSubmit={handleDeletar}>
                  <button style={{marginTop: "30px"}} className="botao" onClick={()=>handleDeletar()}>Sim</button>
                  <button style={{marginTop: "30px"}} className="botao" onClick={() => handleClose2()}>Não</button>
            </div>
        </div>
      </div>
      )
      
        return(
            <div className="container" style={{height:`${tm()}px`}}>

           <p style={{color:'#FE963D',marginRight:'18vw',cursor:'pointer',fontWeight:'bold',marginTop:'50px',display:'flex',justifyContent:'center'}} onClick={handleOpen}>
               <AssignmentRoundedIcon/>Novo projeto
               </p>
           <p style={{color:'#FE963D',fontWeight:'bold',fontSize:'40px',marginRight:"15%"}}>Projetos</p>
            {
               estado && estado.map((estado, ind)=>{
                        let y = format(new Date(estado.data_inicial),"dd/MM/yyyy");
                        let x = format(new Date(estado.data_final),"dd/MM/yyyy");
                   
                        return <CardProjeto 
                        deletar={()=>handleOpen2(ind)}
                        key={estado.id}
                        nome={estado.nome} 
                        descricao={estado.descricao}
                        inicial={x}
                        final={y}
                        ></CardProjeto>
            })
            }
     <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        className={classes.modal}
      >
        <NovoProjeto/>
      </Modal>

      <Modal
        open={open2}
        onClose={handleClose2}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        className={classes.modal}
      >
        {modal}
      </Modal>
        </div>    
    )
   
}