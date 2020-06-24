import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers/";
import DateFnsUtils from '@date-io/date-fns';
const useStyles = makeStyles((theme) => ({

    campos: {
       
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
            color:'#FE963D',
    },
 
    '& .MuiInput-underline:before':{
        borderBottom:'2px solid #7A57EA '
    }
         
       
      },
      
        
     
  }));

function InputData(props){
    const classes = useStyles();
    return(
        <>
        <MuiPickersUtilsProvider utils={DateFnsUtils}><KeyboardDatePicker style={props.style}  format="dd/MM/yyyy" className={classes.campos}></KeyboardDatePicker></MuiPickersUtilsProvider>
        </>
    )
}

export default InputData;