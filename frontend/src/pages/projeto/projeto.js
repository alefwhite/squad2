import React, {useEffect, useState} from 'react';
import CardProjeto from '../../components/CardProjeto/CardProjeto';
import api from '../../service/api';
import {format} from 'date-fns';
import Modal from '@material-ui/core/Modal';
import {makeStyles} from '@material-ui/core/styles';
import NovoProjeto from '../../components/NovoProjeto/NovoProjeto';
import AssignmentRoundedIcon from '@material-ui/icons/AssignmentRounded';
import Input from '../../components/Input/Input.js';
import Botao from '../../components/Botao/Botao.js';
import InputData from '../../components/InputData/InputData.js';


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

const estilo = {
  input:[
      {marginRight:'55%',marginTop:'0px'},
  
  ],
  p:{
      color:'#FE963D',
      marginLeft:'2%',
      fontSize:'25px'
  },

  espacoCampo:{
      marginLeft:'2%',
      marginBottom:'5%'
  }
  
}

export default function Projeto(){
    const [estado,setEstado] = useState([]);
    const [open, setOpen] = useState(false);
    const [open2, setOpen2] = useState(false);
    const [open3, setOpen3] = useState(false);
    const [idprojeto, setIdprojeto] = useState(false);
    const [nome,setNome]= useState('');
    const [descricao,setDescricao] = useState('');
    const [inicio,setInicio] = useState(new Date());
    const [fim,setFim] = useState(new Date());

    const classes = useStyles();

    

    const listar = async () =>{                 
          await api.get('/projeto')
            .then(response =>{    
                setEstado(response.data);
                console.log(response.data);

            });
        
    }
    
    useEffect(()=>{
        listar();
    },[]);


    const handleDeletar = async () =>{
        let index = idprojeto;
        let data = estado[index].id_projeto

  
        await api.delete(`/projeto/${data}`)
          .then(response =>{
                console.log(`sucesso:${response}`);
            });
       
        handleClose2();
        listar();
    } 

    async function handleEditar(x){
      x.preventDefault();
      console.log(inicio);
      
   
      let data_inicial =  inicio;
      let data_final =  fim;
 
      
      let data = {
          nome,
          descricao,
          data_inicial,
          data_final
      }
      const index = estado[idprojeto].id_projeto;
     
      const response = await api.put(`projeto/${index}`,data);

      if(response.status===200){
          console.log(response);
      } 

    handleClose3();
    listar();
    
  }
  function handlePreencher(evento,espaco){
    switch(espaco){
        case "nome":{
            setNome(evento.target.value);
            break;
        }
        case "descricao":{
            setDescricao(evento.target.value);
            break;
        }
        case "inicio":{
            setInicio(evento);
           
            break;
        }
        case "fim":{
            setFim(evento);
            break;
        }
        default: 
            return 
    }
    
}
    
    const handleOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
        listar();
      };

      const handleOpen2 = (index) => {
        setOpen2(true);
        setIdprojeto(index);
      };
    
      const handleClose2 = () => {
        setOpen2(false);
      };
      
      const handleOpen3 = (index) => {
        setOpen3(true);
        setIdprojeto(index);
        setNome(estado[index].nome);
        setDescricao(estado[index].descricao);
        setInicio(estado[index].data_inicial);
        setFim(estado[index].data_final);
      }
      const handleClose3 = () => {
        setOpen3(false);
      };
    
      const modal =(
        <div  className={classes.paper}>
        <h2 style={{color: "#7A57EA", marginBottom: "11px", textAlign: "center"}} id="simple-modal-title">Tem certeza que você deseja excluir?</h2>
        <div id="simple-modal-description">
            <div className={classes.formDel} onSubmit={handleDeletar}>
                  <button style={{marginTop: "30px"}} className="btn_sim" onClick={()=>handleDeletar()}>Sim</button>
                  <button style={{marginTop: "30px"}} className="btn_nao" onClick={() => handleClose2()}>Não</button>
            </div>
        </div>
      </div>
      )

     const modalEditar=(
        <div className="container3">
            <form className='forms' onSubmit={handleEditar} >
                <div>
                <p style={estilo.p}>Nome do projeto</p>
                </div>
                <h1 style={estilo.espacoCampo}><Input width="45vw" variant="standard" value={nome} funcao={(evento)=>handlePreencher(evento,"nome")}/></h1 >

                <h1 style={estilo.espacoCampo}><InputData style={estilo.input[0]} value={inicio} label="Início" funcao={(evento)=>handlePreencher(evento,"inicio")}/>
                <InputData  width='30vw' value={fim}  style={estilo.input[1]} label="Fim" funcao={(evento)=>handlePreencher(evento,"fim")}/></h1 >
                <div>
                <p style={estilo.p}>Descrição do projeto</p>
                <h1  style={estilo.espacoCampo}><Input  multiline="false" width="35vw" value={descricao} funcao={(evento)=>handlePreencher(evento,"descricao")}/></h1 >
                </div>
                <h1 style={{textAlign:'center'}}><Botao type="submit" children="CONCLUIR" width="90px"></Botao></h1>
           
            </form>
        </div>
      )
      
        return(
            <div className="container">

            <div style={{alignSelf:'center',justifyContent:'center'}}>
              <p style={{color:'#FE963D',fontWeight:'bold',fontSize:'40px',marginRight:"15%", marginTop:'20px'}}>Projetos</p>
              <p style={{color:'#FE963D',marginRight:'18vw',cursor:'pointer',fontWeight:'bold', marginTop:'10px'}} onClick={handleOpen}>
                <AssignmentRoundedIcon/>
                Novo projeto 
              </p>
           </div>
            {
               estado && estado.map((estado, ind)=>{
                        let y = format(new Date(estado.data_inicial),"dd/MM/yyyy");
                        let x = format(new Date(estado.data_final),"dd/MM/yyyy");
                   
                        return <CardProjeto 
                        editar={()=>handleOpen3(ind)}
                        deletar={()=>handleOpen2(ind)}
                        key={estado.id_projeto}
                        nome={estado.nome} 
                        descricao={estado.descricao}
                        inicial={y}
                        final={x}
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
        <NovoProjeto handleClose={handleClose} setOpen={setOpen} />
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

      <Modal
        open={open3}
        onClose={handleClose3}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        className={classes.modal}
      >
        {modalEditar}
      </Modal>
        </div>    
    )
   
}