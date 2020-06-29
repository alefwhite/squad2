import React, {useRef} from 'react';
import './Membro.css'



function Membro(props){
    const container = useRef(null);
        const stilo = {cores:[
            {borderColor:"rgb(213,0,0)"},
            {borderColor:"rgb(53,194,255)"},
            {borderColor:"rgb(255,242,0)"},
            {borderColor:"rgb(182,231,35)"},
            {borderColor:"rgb(255,106,155)"},
            {borderColor:"rgba(189,108,189)"},
            {borderColor:"rgb(234,182,0)"},
           
        ]}

        function cores(){
            let x = Math.floor((Math.random()*6)+1);
            return(x);
        }
        function horizontalScroll (event) {
            const delta = Math.max(-1, Math.min(1, (event.nativeEvent.wheelDelta || -event.nativeEvent.detail)))
            event.currentTarget.scrollLeft -= (delta * 30)
            
          }
    return(
        <div className="container2">
            <div className="teste" ref={container}>
           <ul onWheel={(event)=>horizontalScroll(event)}>
               <li>
                   
                       <img className="img" style={stilo.cores[cores()]} alt=""/> 
               
                   <span className="user">Teste</span>
               </li>
               <li>
              
                       <img className="img" style={stilo.cores[cores()]} alt=""/>
               
                   <span className="user">Teste</span>
               </li>
               <li>
                   
                       <img className="img" style={stilo.cores[cores()]} alt="" />
               
                   <span className="user">Teste</span>
               </li>
               <li>
     
                       <img className="img" style={stilo.cores[cores()]} alt=""/>
              
                   <span className="user">Teste</span>
               </li>
               <li>
                   
                       <img className="img" style={stilo.cores[cores()]} alt="" />

                   <span className="user">Teste</span>
               </li>
               <li>
                 
                       <img className="img" style={stilo.cores[cores()]} alt=""/>
       
                   <span className="user" >Teste</span>
               </li>
           </ul>
           </div>
       
        </div>
        
    )
    
}

export default Membro;