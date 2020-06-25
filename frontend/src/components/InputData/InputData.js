import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers/";
import DateFnsUtils from '@date-io/date-fns';
const useStyles = makeStyles((theme) => ({

    campos: {
      '& label.Mui-focused': {
        color: '#FE963D',
  
    
      },
      '& .MuiFormLabel-root':{
        color:'#FE963D',
        fontSize:'25px',
        
      },
        '& .MuiInputBase-root':{
          '& .MuiInputBase-input': {
            color: "#7A57EA",
            
            borderBottom: '2px solid #7A57EA',
            width: '90px'
          },
          
          '& .MuiInputBase-input:hover':{
            borderColor:'#7A57EA',
          }
          
        }
        ,
          
          '& .MuiInput-underline:after':{
            borderBottom: '2px solid #7A57EA ',
           
          },
          '& .MuiIconButton-label':{
            color:'#7A57EA',
    },
 
    '& .MuiInput-underline:before':{
        borderBottom:'2px solid #7A57EA '
    },
    '& .MuiInput-underline:hover':{
      borderBottom: '1px solid #7A57EA',
      
    },
         
       
      },
      
      
     
     
  }));

function InputData(props){
    const classes = useStyles();
    return(
        <>
        <MuiPickersUtilsProvider utils={DateFnsUtils}><KeyboardDatePicker 
        style={props.style} 
        label={props.label}  
        format="dd/MM/yyyy" 
        className={classes.campos}
        onChange={props.funcao}
        value={props.value}/></MuiPickersUtilsProvider>
        </>
    )
}

export default InputData;