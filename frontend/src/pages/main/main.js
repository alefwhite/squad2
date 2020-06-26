import React from 'react'
import SideBar from '../../components/Sidebar/sidebar';


// @ Get this values from server
const userPermissionsData = [
  {
    contentName: 'content',
    icon: 'AccountTreeIcon',
    name: 'Sessao 1',
    route: '/rota-1'
  },
  {
    contentName: 'MinhasInformacoes',
    icon: 'AssessmentIcon',
    name: 'Minhas Informações',
    route: '/rota-2'
  },
  {
    contentName: 'CriarTarefa',
    icon: 'CreateIcon',
    name: 'Criar Tarefa',
    route: '/rota-3'
  },
 
]

const Main = () => <SideBar userPermissionsData={userPermissionsData} />


export default Main