import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import AddToHomeScreenIcon from '@material-ui/icons/AddToHomeScreen';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import defineIcons from '../../utils/defineIcon';
import { Alert, AlertTitle  } from '@material-ui/lab';
import Collapse from '@material-ui/core/Collapse';
import CloseIcon from '@material-ui/icons/Close';

import { parseJWT } from '../../service/parseJWT';
import api from '../../service/api';

// Pages
import Projeto from '../../pages/Projeto/projeto';
import SquadUsuario from '../../pages/SquadUsuario/squadusuario';
import MinhasInformacoes from '../../pages/MinhasInformacoes/minhasInformacoes';
import MinhasInformacoesFunc from '../../pages/MinhasInformacoes/minhasInformecoesFunc';
import Ponto from '../../pages/Ponto/ponto';
import Convidar from '../../pages/Convidar/convidar';
import Squad from '../../pages/SquadCadastro/squad';
import UploadImagem from '../UploadImagem/UploadImagem';

import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

// profile
import './profile.css';
import ProfilePadrao from './Profile_id.png';

// import ImageIcon from '@material-ui/icons/Image';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Badge from '@material-ui/core/Badge';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',        
    },
    rootNotificacao: {
        width: '100%',
      '& > * + *': {
        marginTop: theme.spacing(2),
      },
      position: 'absolute'
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        background: "#303030",
        color: "#FE963D"
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
    },
    hide: {
        display: 'none',
    },
    drawer: {
        background: "#303030",
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        color: "#FE963D",

    },
    drawerOpen: {
        background: "#303030",
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerClose: {
        background: "#303030",
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: theme.spacing(7) + 1,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9) + 1,
        },
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end', 
        padding: theme.spacing(0, 1),
        ...theme.mixins.toolbar,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),       
    },
    sectionDesktop: {
        display: 'flex',
        [theme.breakpoints.up('md')]: {
          display: 'flex',
        },
    },
    grow: {
        flexGrow: 1,
    },
    outlinedPrimary: {
        /* … */
        '&:hover': { background: "#7A57EA", color: "#fff !important" },
    },
    itemColor: {
        color: "#FE963D"
    },
    inboard: {
        color: "#7A57EA",
        fontSize: "30px",
        fontWeight: "bold !important",
        cursor: "pointer"
    },
    margin_right: {
        marginRight: "12px"
    },
    position: {
        position: "fixed",
        top: 0,
        right: 0
    },
    positionClosed: {
        position: "fixed",
        top: 64,
        right: 0,
        color: "#FFF"
    },
    marginsAlert: {
        marginBottom: "10px",
        marginTop: "10px",
    },
    DivConteudo: {
        cursor: "pointer",
    } 
}));

const SideBar = ({ userPermissionsData }) => {
    const classes = useStyles();
    const theme = useTheme();
    const history = useHistory();

    const [open, setOpen] = useState(false);
    const [openNotification, setOpenNotification] = useState(false);
    const [content, setContent] = useState('')
    const [profileImg, setProfileImg] = useState('none')
    const [profile, setProfile] = useState('');
    const [notificacoes, setNotificacoes] = useState([]);
    const [totalNotificacoes, setTotalNotificacoes] = useState(0);
    // const [upload, setUpload] = useState(false);

    const handleDrawerOpen = () => {
        setProfileImg('block');
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setProfileImg('none');
        setOpen(false);
    };

    const defineContent = (content) => {
        
        switch (content) {
            case 'Projetos':
                return <Projeto />;
            case 'SquadUsuario':
                return <SquadUsuario />;
            case 'MinhasInformacoes':
                return <MinhasInformacoes />;            
            case 'MinhasInformacoesFunc':
                return <MinhasInformacoesFunc />;            
            case 'Squad':
                return <Squad />;  
            case 'Ponto':
                return <Ponto />;   
            case 'Convidar':
                return <Convidar />;   
            default:
                return;
        }
    }

    const Deslogar = () => {
        console.log("Tipo: ", parseJWT().id_tipousuario);
        localStorage.clear();
        history.push("/login");
    };

    const ImgProfile = async () => {
       
        await api.get("/uploadusuario")
        .then((response) => {
            console.log("Profile: ", response.data)
            if(response.data.imgurl) {
                setProfile(response.data.imgurl);
            }
        });   
    };
      

    const ListarNotificacoes = async () => {
        await api.get("/notificacao")
            .then((response) => {
                if(response.status === 200) {
                    setNotificacoes(response.data);
                    setTotalNotificacoes(response.data.length);
                    console.log("Notificacoes: ", response.data)
                }
            });
    }
    
    const MarcarNotificacao = async (id) => {
        console.log(id)
        setNotificacoes(notificacoes.filter((notificacao) => {
            setTotalNotificacoes(totalNotificacoes - 1);
            return notificacao._id !== id;
        }));

        await api.put(`/notificacao/${id}`);           
    }

    useEffect(() => {
        ImgProfile();
        ListarNotificacoes();

        if (!content) {
            setContent('Ponto');
        }

    }, [content]);

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar
                position="fixed"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: open,
                })}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        className={clsx(classes.menuButton, classes.outlinedPrimary,{
                            [classes.hide]: open,
                        })}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap className={classes.inboard}>
                       In<span className={classes.itemColor}>Board</span>
                    </Typography>
                    <div className={classes.grow} />

                    <div className={classes.sectionDesktop}>
                        <IconButton aria-label="show 17 new notifications" color="inherit" onClick={() => {openNotification === false ? setOpenNotification(true) : setOpenNotification(false)}} className={clsx(classes.outlinedPrimary, classes.margin_right)}>
                            <Badge badgeContent={totalNotificacoes} color="secondary">
                                <NotificationsIcon />
                            </Badge>
                        </IconButton>
                        <IconButton  onClick={() => Deslogar()} size="small" color="inherit" className={clsx(classes.outlinedPrimary, classes.margin_right)}>
                                <AddToHomeScreenIcon className={classes.outlinedPrimary} edge="end" color="inherit"/> Sair
                        </IconButton>

                        {/* <Button onClick={() => Deslogar()} className={classes.outlinedPrimary} edge="end" color="inherit">Sair</Button> */}

                    </div>
                </Toolbar>
            </AppBar>
            <Drawer
                variant="permanent"
                className={clsx(classes.drawer, {
                    [classes.drawerOpen]: open,
                    [classes.drawerClose]: !open,
                })}
                classes={{
                    paper: clsx({
                        [classes.drawerOpen]: open,
                        [classes.drawerClose]: !open,
                    }),
                }}
            >   
               
                <div className={classes.toolbar}>
                    <IconButton onClick={handleDrawerClose} style={{color: "#7A57EA"}} size="medium">
                        {theme.direction === 'rtl' ? <ChevronRightIcon fontSize="large"/> : <ChevronLeftIcon fontSize="large"/>}
                    </IconButton>
                </div>
                <div className="profile_info" id="profile" style={{display: profileImg}}>
                    <div className="profile_img">
                        {/* <img src={profile} alt="profile"/> */}
                        {
                            
                            profile ? <img src={profile} alt="profile" /> : <img src={ProfilePadrao} alt="profile"/>
                           
                        }
                    </div>
                    <div className="profile_data">
                        <p className="name">{localStorage.getItem("nome")}</p>
                    </div>
                </div>
                <Divider />            
                    <List className={classes.itemColor}>
                            <ListItem button className={classes.outlinedPrimary}>
                                        {/* <span><ImageIcon/></span> */}
                                        {/* <ListItemText  primary="Selecionar Imagem" style={{ marginLeft: '31px',fontWeight: "900" }} /> */}
                                        <UploadImagem funcao={ImgProfile}/>
                            </ListItem> 
                            {userPermissionsData.map((item) => (
                                    <ListItem button key={item.route}  onClick={() => setContent(item.contentName)} className={classes.outlinedPrimary}>
                                        <span>{defineIcons(item.icon)}</span>
                                        <ListItemText  primary={item.name} style={{ marginLeft: '31px',fontWeight: "900" }} />
                                    </ListItem>                                
                            ))}
                    </List>               
            </Drawer>
            <main className={classes.content}>
                <div className={classes.toolbar}/>
                <ToastContainer/>
                {defineContent(content)}
                <div className={classes.rootNotificacao}>         
                    <Collapse in={openNotification} style={{maxWidth: "400px"}} className={classes.positionClosed}>
                        {
                            notificacoes && notificacoes.map((n) => {
                                console.log("Teste")

                                return (
                                    <Alert
                                        className={classes.marginsAlert}
                                        key={n._id}
                                        severity="info"                                       
                                        variant="outlined"
                                        color="warning"
                                        action={
                                        <IconButton
                                            aria-label="close"
                                            size="small"
                                            onClick={() => {
                                                setOpenNotification(false);
                                            }}
                                        >
                                            <CloseIcon fontSize="inherit"   style={{color: "#FFF"}}/>
                                        </IconButton>
                                        }
                                    >  
                                        <AlertTitle onClick={(e) => MarcarNotificacao(n._id)} className={classes.DivConteudo}>Marcar como lida</AlertTitle>
                                        <div style={{color: "white"}}>
                                           {n.conteudo}
                                        </div>

                                    </Alert>
                                )
                            })
                        }
                    </Collapse>
                </div>
            </main>
        </div>
    );
}


export default SideBar;