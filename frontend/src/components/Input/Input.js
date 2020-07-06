import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';



function Input(props){
  const useStyles = makeStyles((theme) => ({

    campos: {
       
        '& label.Mui-focused': {
          color: '#FE963D',
          fontSize:'25px'
      
        }, 
        '& .MuiFormLabel-root':{
          color:'#FE963D'
        },

        '& .MuiInputLabel-outlined.MuiInputLabel-shrink': {
          color: '#FE963D',
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
            width: props.width? props.width:'77vw',
            maxWidth: "420px",
            
          },
      
        },
        '& .MuiInputBase-root':{
          '& .MuiInputBase-input': {
            color: "#FE963D",
            borderColor:'#7A57EA',
            borderBottom: '2px solid #7A57EA',
            width: props.width? props.width:null
          },          
         
        }
        ,
          
          '& .MuiInput-underline:after':{
            borderBottom: '2px solid #7A57EA',
            
          },
          '& .MuiInput-underline:hover':{
            borderBottom: '1px solid #7A57EA',
            
          },
          '& .MuiInputBase-input': {
            width: props.width,
            borderBottom: '2px solid #7A57EA',
            
          },
          '& .MuiInput-underline:before':{
            borderBottom: '2px solid #7A57EA',
            
          },
          '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
            borderColor: '#FE963D',
          }
        
       
      },
        
     
  }));

    const classes = useStyles();
    return(
      <>
          <TextField 
          required={props.required} 
          disabled={props.leitura} 
          value={props.value} 
          className={classes.campos} 
          variant={props.variant} 
          id={props.id} type={props.type} 
          label={props.label} 
          name={props.name} 
          autoComplete={props.autoComplete} 
          onChange={props.funcao}
          multiline={props.multiline}/>
        
        </>
    )

}

export default Input;