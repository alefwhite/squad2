import React, { useEffect, useState } from 'react'
import SideBar from '../../components/Sidebar/sidebar';
import { parseJWT } from '../../service/parseJWT';
import { usuarioAutenticado} from '../../service/auth';


const Main = () => {
  const [userPermissionsData, setUserPermissionsData] = useState([]);

  // let userPermissionsData = [];
  
  
  const VerificaUsuario =  () => {
    if(usuarioAutenticado()) {
      console.log("Tipo Usuario: ", parseJWT().id_tipousuario);
    
      parseJWT().id_tipousuario === 3
          // Opções de menu do funcionário
          ? setUserPermissionsData([
            {
              contentName: 'MinhasInformacoesFunc',
              icon: 'AssessmentIcon',
              name: 'Minhas Informações',
              route: '/rota-2'
            },
            {
              contentName: 'SquadTarefaFunc',
              icon: 'AssignmentIndIcon',
              name: 'Squad/Tarefa',
              route: '/rota-7'
            },
            {
              contentName: 'Ponto',
              icon: 'Clock',
              name: 'Ponto',
              route: '/rota-8'
            },  
            
          
          ])
          // Opções de menu do gestor
          : setUserPermissionsData([
            {
              contentName: 'MinhasInformacoes',
              icon: 'AssessmentIcon',
              name: 'Minhas Informações',
              route: '/rota-1'
            },
            {
              contentName: 'Convidar',
              icon: 'GroupAddIcon',
              name: 'Convidar',
              route: '/rota-2'
            }, 
            {
              contentName: 'Projetos',
              icon: 'AccountTreeIcon',
              name: 'Projetos',
              route: '/rota-3'
            },   
            {
              contentName: 'Squad',
              icon: 'CreateIcon',
              name: 'Cadastrar Squad',
              route: '/rota-4'
            },   
            {
              contentName: 'SquadUsuario',
              icon: 'GroupIcon',
              name: 'Squad/Usuário',
              route: '/rota-5'
            },
            {
              contentName: 'NovaTarefa',
              icon: 'AssignmentIcon',
              name: 'Nova Tarefa',
              route: '/rota-6'
            },
            {
              contentName: 'SquadTarefa',
              icon: 'AssignmentIndIcon',
              name: 'Squad/Tarefa',
              route: '/rota-7'
            },
            {
              contentName: 'Ponto',
              icon: 'Clock',
              name: 'Ponto',
              route: '/rota-8'
            },             
            
          ]);
    }
  
  };

  useEffect(() => {
    VerificaUsuario();
    
  }, []);

  return(
      <SideBar userPermissionsData={userPermissionsData} />
  )
  
}

export default Main;