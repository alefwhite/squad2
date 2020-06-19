import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({

    campos: {
       
        '& label.Mui-focused': {
          color: '#7A57EA',
  
        },    
        '& .MuiOutlinedInput-root': {
          '& fieldset': {
            border: "2px solid #7A57EA ",
            borderRadius: "20px",
            color: "red"
          },
          '&:hover fieldset': {
            borderColor: '#7A57EA',
          },
          '&.Mui-focused fieldset': {
            borderColor: '#7A57EA',
          },
          "& .MuiInputBase-input": {
            color: "#7A57EA",
            backgroundColor: "white",
            borderRadius: "22px",
            width: "250px"
          }
        },
      }
    ,
  }));

function Input(props){
    const classes = useStyles();
    return(
        <TextField className={classes.campos} variant="outlined" id={props.id} type={props.type} label={props.label} name={props.name} autoComplete={props.autoComplete} onChange={props.funcao}/>
    )

}

export default Input;