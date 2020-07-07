import React from 'react';
import Button from '@material-ui/core/Button';
import {makeStyles} from '@material-ui/core/styles';


function Botao(props){

    const useStyles = makeStyles((theme)=>({
        botao:{
           '&.MuiButton-contained':{
               borderRadius:"5px",
               color:'#fff',
               backgroundColor:'#FE963D',
               width:props.width,
               height:props.height,
               fontSize: props.fontSize ? props.fontSize:null,
               textTransform:props.transform ? props.transform:null
           },
           '&.MuiButton-contained:hover':{
                backgroundColor:'#E38834'
           }
        }
    }))

    const classes = useStyles();

    return(
    <Button variant="contained" type={props.type} className={classes.botao} onClick={props.funcao}>{props.children}</Button>
    )
}

export default Botao;