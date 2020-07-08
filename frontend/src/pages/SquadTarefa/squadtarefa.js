import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import api from '../../service/api';
import InfiniteScroll from 'react-infinite-scroll-component';

import './squadtarefa.css';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: "#303030",
    boxShadow: "2px 2px 33px 0px rgba(0,0,0,0.32)",
    borderRadius: "20px",
    display: 'flex',
    width: "100%",
    color: "#7A57EA"
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
    width: "100%",
    minWidth: 150,
    maxWidth: 250,
    height: "100vh",
    color: "#FE963D"
  },
  roots: {
    '& > *': {
      marginTop: theme.spacing(2),
      display: "flex",
      justifyContent: "center"
    },
  },
}));


const SquadTarefa = () => {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const [squad, setSquad] = useState([]);
  const [squadTarefa, setSquadTarefa] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [id, setId] = useState(null);

  const clearState = () => {
    for(let i = 0; i < squadTarefa.length; i++) {
      setSquadTarefa([]);
    }
    // setSquadTarefa(squadTarefa.filter((valor) => {
    //   return !(id === valor.id_squad);
    // }))
  }
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const ListarSquad = async () => {
      const response = await api.get('/squad');

      if(response.status === 200) {
        setSquad(response.data);
      }
  }

  const ListarSquadTarefa = async (id_squad) => {
    console.log("Id ", id_squad)   
    setId(id_squad);
    const response = await api.get(`/squadtarefa?id=${id_squad}&&page=${page}`);

    if(response.status === 200) {
      console.log("Te ", squadTarefa)
      setSquadTarefa(squadTarefa.concat(response.data))
      setTotalPage(response.headers['x-total-count']);
      console.log("Squad/Tarefa", response.headers['x-total-count']);
    }

  };  
  
  
  const fetchMoreData = () => {
    // 20 more records in 1.5 secs
    setTimeout(() => {
        console.log("Page: ", page)
        console.log("Total: ", totalPage)
      if(page < totalPage) {
        setPage(page + 1);       
      }

      console.log(page)

      ListarSquadTarefa(id);
    
    }, 1000);

  };

  useEffect(() => {
    ListarSquad();    

  }, [id]);

  return (
    <div className="contentSquads">
        <h1 className="titleSquads">Tarefas das Squads</h1>        
        <div className={classes.root}>
        <Tabs
            orientation="vertical"
            variant="scrollable"
            value={value}
            onChange={handleChange}
            aria-label="Vertical tabs example"
            className={classes.tabs}
        >   
            {
                squad && squad.map((squad, index) => {
                    return (
                        <Tab  key={index} label={squad.nome} 
                        onClick={() => {
                          clearState()
                          ListarSquadTarefa(squad.id_squad)                          
                        }} 
                        {...a11yProps(index)} 
                        />
                    )
                })
            }
            {/* <Tab label="Item Two" {...a11yProps(1)} />
            <Tab label="Item Three" {...a11yProps(2)} />
            <Tab label="Item Four" {...a11yProps(3)} />
            <Tab label="Item Five" {...a11yProps(4)} />
            <Tab label="Item Six" {...a11yProps(5)} />
            <Tab label="Item Seven" {...a11yProps(6)} /> */}
        </Tabs>        
        {
          squad && squad.map((s, i) => {
              return (
                  <TabPanel style={{display: "flex"}}value={value} key={s.id_squad} index={i}>
                    <InfiniteScroll
                      dataLength={squadTarefa.length}
                      next={fetchMoreData}
                      hasMore={true}
                      scrollThreshold="50px"
                      loader={<h4 style={{textAlign: "center"}}>Carregando....</h4>}
                      height={400}
                      endMessage={
                        <h1 style={{textAlign: 'center'}}>
                          <b>Yay! You have seen it all</b>
                        </h1>
                      }
                    >
                      <div className="cardSquadTarefa">
                        {   
                            squadTarefa.length > 0 ?
                              squadTarefa && squadTarefa.map((t, y) => {                
                                return <div className="cardSquadTarefaContent" key={y}>{t.tarefa_nome }</div>
                              })
                            : <h1 style={{color: "#FE963D", margin: "auto", textAlign: "center"}}>Sem tarefas</h1>
                          }
                      </div>
                    </InfiniteScroll>                   
                  </TabPanel>
              )
          })
        }
        </div>        
    </div>
  );
}
export default SquadTarefa;