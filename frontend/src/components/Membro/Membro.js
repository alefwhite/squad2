import React from 'react';
import './Membro.css'



function Membro(props){
        const stilo = {cores:[
            {borderColor:"rgba(213,0,0)"},
            {borderColor:"rgba(53,194,255)"},
            {borderColor:"rgba(255,242,0)"},
            {borderColor:"rgba(182,231,35)"},
            {borderColor:"rgba(255,106,155)"},
            {borderColor:"rgba(189,108,189)"},
            {borderColor:"rgba(234,182,0)"}
        ]}

        function teste(){
            let x = Math.floor((Math.random()*6)+1);
            console.log(x);
            
            return(x);
        }
    return(
        <div className="container2">
            <div className="teste">
           <ul>
               <li>
                   
                       <img className="img" style={stilo.cores[teste()]}></img>
               
                   <span className="user">Teste</span>
               </li>
               <li>
              
                       <img className="img" style={stilo.cores[teste()]}></img>
               
                   <span className="user">Teste</span>
               </li>
               <li>
                   
                       <img className="img" style={stilo.cores[teste()]}></img>
               
                   <span className="user">Teste</span>
               </li>
               <li>
     
                       <img className="img" style={stilo.cores[teste()]}></img>
              
                   <span className="user">Teste</span>
               </li>
               <li>
                   
                       <img className="img" style={stilo.cores[teste()]}></img>

                   <span className="user">Teste</span>
               </li>
               <li>
                 
                       <img className="img" style={stilo.cores[teste()]}></img>
       
                   <span className="user" >Teste</span>
               </li>
           </ul>
           </div>
       
        </div>
        
    )
    
}

export default Membro;