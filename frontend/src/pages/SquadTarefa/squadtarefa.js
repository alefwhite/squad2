import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import api from '../../service/api';
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
    height: 224,
    color: "#7A57EA"
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
}));

const SquadTarefa = () => {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const [squadtarefa, setSquadTarefa] = useState([]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const ListarSquadTarefa = async () => {
      const response = await api.get('/squadtarefa');

      if(response.status === 200) {
        setSquadTarefa(response.data);
        console.log("Squad/Tarefa", response.data)
      }
  }


  useEffect(() => {
    ListarSquadTarefa();
  }, []);

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
                squadtarefa && squadtarefa.map((squadtarefa, index) => {
                    return (
                        <Tab label={squadtarefa.squad} {...a11yProps(index)} />
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
            squadtarefa && squadtarefa.map((squadtarefa, index) => {
                return (
                    <TabPanel value={value} index={index}>
                        {squadtarefa.squad}
                    </TabPanel>
                )
            })
        }
        {/* <TabPanel value={value} index={0}>
            Item One
        </TabPanel>
        <TabPanel value={value} index={1}>
            Item Two
        </TabPanel>
        <TabPanel value={value} index={2}>
            Item Three
        </TabPanel>
        <TabPanel value={value} index={3}>
            Item Four
        </TabPanel>
        <TabPanel value={value} index={4}>
            Item Five
        </TabPanel>
        <TabPanel value={value} index={5}>
            Item Six
        </TabPanel>
        <TabPanel value={value} index={6}>
            Item Seven
        </TabPanel> */}
        </div>
    </div>
  );
}
export default SquadTarefa;