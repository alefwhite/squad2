import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import './home.css';


const useStyles = makeStyles((theme) => ({


    fundo: {
        flexDirection:'column',
        backgroundColor: '#303030',
        alignContent: 'center',
        alignItems: 'center',
        display:'flex',
        height: '100vh',
        overflowY: 'hidden',
        justifyContent:'center',

    },

    quadro1: {
        
        display: 'flex ',
        background: '#4A4848',
        boxShadow: '4px 4px 4px rgba(0, 0, 0, 0.15)',
        borderRadius: '10px',
        width: '308px',
        height: '178px',
        justifyContent: 'center',
        alignSelf:'center'
        
        
    },

    fonte: {
        fontWeight: '500',
        fontSize: '24px',
        lineHeight: '28px',
        display: 'flex',
        alignItems: 'center',
        color: '#FE963D',
    },

}));

export default function Inicio() {
    const classes = useStyles();

    return (
            <div className={classes.fundo}>

                <h1 className={classes.fonte}>Tarefas</h1>
                <div className={classes.quadro1}>


                </div>
                <h1 className={classes.fonte}>Squads</h1>
                <div className={classes.quadro1}>

                </div>

            </div>
        
    )}