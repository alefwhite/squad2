import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';


const useStyles = makeStyles((theme) => ({

    campos: {
       
        '& label.Mui-focused': {
          color: '#7A57EA',
          fontWeight:'bold',
      
        }, 
        '& .MuiFormLabel-root':{
          color:'#FE963D'
        },

        '& .MuiInputLabel-outlined.MuiInputLabel-shrink': {
          color: '#7A57EA',
          fontWeight:'bold',
      
        },  
         
        '& .MuiOutlinedInput-root': {
          '& fieldset': {
            border:'2px solid #7A57EA',
            borderRadius: '20px',
            
          },
          '&:hover fieldset': {
            borderColor: '#7A57EA',
          },
          '&.Mui-focused fieldset': {
            borderColor: '#7A57EA',
          },
         '& .MuiInputBase-input': {
            color: "#FE963D",
            backgroundColor: 'white',
            borderRadius: '22px',
            width: '77vw'
          },
      
        },
        '& .MuiInputBase-root':{
          '& .MuiInputBase-input': {
            color: "#FE963D",
            
            borderBottom: '2px solid #7A57EA',
            width: '150px'
          },
          
          '&:hover .MuiInputBase-input':{
            borderColor:'#7A57EA',
          }
        }
        ,
          
          '& .MuiInput-underline:after':{
            borderBottom: '2px solid #7A57EA',
            
          },
         
         
       
      },
        
     
  }));

function Input(props){
    const classes = useStyles();
    return(
      <>
        <TextField className={classes.campos} variant={props.variant} id={props.id} type={props.type} label={props.label} name={props.name} autoComplete={props.autoComplete} onChange={props.funcao}/>
        
        </>
    )

}

export default Input;