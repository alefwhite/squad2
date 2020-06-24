import React from 'react';
import Button from '@material-ui/core/Button';
import {makeStyles} from '@material-ui/core/styles';


function Botao(props){

    const useStyles = makeStyles((theme)=>({
        botao:{
           '&.MuiButton-contained':{
               color:'#fff',
               backgroundColor:'#FE963D',
               width: props.width
           },
           '&.MuiButton-contained:hover':{
                backgroundColor:'#E38834'
           }
        }
    }))

    const classes = useStyles();

    return(
    <Button variant="contained"  className={classes.botao} onClick={props.funcao}>{props.children}</Button>
    
    )
}

export default Botao;