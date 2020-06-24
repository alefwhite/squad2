import React from 'react'
import SideBar from '../../components/sideBarLogged/sideBarLogged'


// @ Get this values from server
const userPermissionsData = [
  {
    contentName: 'content',
    icon: 'AccountTreeIcon',
    name: 'Sessao 1',
    route: '/rota-1'
  },
  {
    contentName: 'content2',
    icon: 'AssessmentIcon',
    name: 'Sessao 2',
    route: '/rota-2'
  },
  {
    contentName: 'content3',
    icon: 'CreateIcon',
    name: 'Sessao 3',
    route: '/rota-3'
  },
  {
    contentName: 'content4',
    icon: 'EmailIcon',
    name: 'Sessao 4',
    route: '/rota-4'
  },
]

const Main = () => <SideBar userPermissionsData={userPermissionsData} />


export default Main