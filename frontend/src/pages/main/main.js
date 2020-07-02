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
            
          
          ])
          // Opções de menu do gestor
          : setUserPermissionsData([
            {
              contentName: 'SquadUsuario',
              icon: 'AccountTreeIcon',
              name: 'Squad/Usuário',
              route: '/rota-1'
            },
            {
              contentName: 'MinhasInformacoes',
              icon: 'AssessmentIcon',
              name: 'Minhas Informações',
              route: '/rota-2'
            },
            {
              contentName: 'Squad',
              icon: 'CreateIcon',
              name: 'Cadastrar Squad',
              route: '/rota-3'
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