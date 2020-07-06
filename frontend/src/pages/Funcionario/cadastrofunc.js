import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import {useHistory} from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import api from '../../service/api'
import { toast, ToastContainer } from 'react-toastify';
import PrimeiraLetraMaiscula from '../../utils/primeiraLetraMaiuscula';
import { mask, unMask } from 'remask';

const useStyles = makeStyles((theme) => ({
    container: {
        background: 'linear-gradient(180deg, #303030 0%, #000000 100%)',
        width: '100%',
        height: '100%',
        overflow:'auto'
    },
    form: {
        marginTop: "20px",
        display:'flex',
        flexDirection:'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',

    },
    submit: {
        background: '#FE963D',
        borderRadius: '10px',
        width: '180px',
        height: '40px',
        marginLeft: '60px',
        justifyContent: 'center',
        marginTop: '80px'
    },
    texto: {
        fontStyle: 'normal',
        fontWeight: '500',
        fontSize: '17px',
        lineHeight: '17px',
        paddingLeft: '20px'
    },
    scroll:{
        overflow:'auto'
    },
    input: {
        maxWidth: "220px"
    },
    inputDiv: {
        display: 'flex',
        flexDirection:'column',
        color: '#7A57EA',
        margin: '10px'
    },
    divLabels: {
        marginLeft: "10px",
        marginBottom: "3px",
        fontWeight: "bold"
    },
    itemColor: {
        color: "#FE963D"
    },
    inboard: {
        color: "#7A57EA",
        fontSize: "2.5em",
        fontWeight: "bold !important",
        cursor: "pointer",
        textAlign: "center",
        padding: "10px"
    },

}));





export default function Cadastrar() {

    const classes = useStyles();
    const history = useHistory();
    const [cargos, setCargos] = useState([]);
    const [novo_cargo, setNovoCargo] = useState("Informe seu cargo");
    const [nome, setNome] = useState("");
    const [nome_social, setNomeSocial] = useState("");
    const [email, setEmail] = useState("");
    const [cpf, setCpf] = useState("");
    const [senha, setSenha] = useState("");
    const [confirmar_senha, setconfirmar_senha] = useState("");


    function cadastrarUsuario(evento, campo) {
        
        if (campo === 'nome') {
            setNome(evento.target.value);
        }
        else if (campo === 'social') {
            setNomeSocial(evento.target.value);
        }
        else if (campo === 'email') {
            setEmail(evento.target.value);
        }
        else if (campo === 'cpf') {
            setCpf(mask(unMask(evento.target.value), ['999.999.999-99']));
        }
        else if (campo === 'senha') {
            setSenha(evento.target.value);
            console.log(senha);
        }
        else if (campo === 'confirmarsenha') {
            setconfirmar_senha(evento.target.value);
        }


    }
       
    async function enviarCadastro(evento) {
        evento.preventDefault()

        let codigo = new URLSearchParams(document.location.search.substring(1))
        codigo = codigo.get("codigo");

        if(!codigo) {
            return toast.warning("Para se cadastrar como um funcionário, o seu gestor deve encaminhar o link de cadastro para você!");
        }

        const data = { 
            nome: PrimeiraLetraMaiscula(nome),
            nome_social: PrimeiraLetraMaiscula(nome_social), 
            email, 
            cpf, 
            senha,
            confirmar_senha, 
            id_cargo: novo_cargo 
        }
        if(senha.length < 6 || confirmar_senha.length < 6) {
            console.log("entrou")
            document.getElementById("senha").focus();
            return toast.info("A senha deve conter no mínimo 6 caracteres")
             
        } 
        else if(novo_cargo.toString() === "Informe seu cargo") {
            console.log("elese if", novo_cargo)
            document.getElementById("cargo").focus();
            return toast.info("Informe seu cargo!");
        }
        else {

            await api.post(`/convite?codigo=${codigo}`, data)
                .then(function (response) {
                    if(response.status === 200) {
                        toast.success(response.data.mensagem);
                        setTimeout(() => {
                            history.push('/login');
                        }, 2000)
                    }
                });           
        }

    }

    const ListarCargos = async () => {
        
        await api.get("/cargos")
        .then( response => {
            setCargos(response.data);
            console.log(response.data);
        })
    };

    const AtualizaCargo = (e) => {
        setNovoCargo(e.target.value);
    };


    useEffect(() => {
        document.title = "Cadastro de funcionários";

        ListarCargos();
    },[]);
    

    return (
        <div className={classes.container}> 
            <h1 className={classes.inboard}>In<span className={classes.itemColor}>Board</span></h1>          
            <form className={classes.form}  onSubmit={enviarCadastro}>
                <div className={clsx(classes.inputDiv)}>
                    <label className={clsx(classes.divLabels)} htmlFor="nome">Nome completo</label>
                    <input
                        className={clsx("inputs")}
                        required={true}
                        value={nome}
                        type="text"
                        id="nome"
                        name="nome"
                        placeholder="Ex: João da Silva"
                        onChange={evento => cadastrarUsuario(evento, evento.target.name)} 
                    >
                    </input>
                </div>
                <div className={clsx(classes.inputDiv)}>
                    <label htmlFor="nome" className={clsx(classes.divLabels)}>Nome social</label>
                    <input
                        value={nome_social}
                        className={clsx("inputs")}
                        required={true}
                        placeholder="Ex: Joãozinho"
                        type="text"
                        name="social"
                        id="social"
                        onChange={evento => cadastrarUsuario(evento, evento.target.name)} 
                    >
                    </input>
                </div>
                <div className={clsx(classes.inputDiv)}>
                    <label htmlFor="email" className={clsx(classes.divLabels)}>E-mail</label>
                    <input
                        value={email}
                        className={clsx("inputs")}
                        required={true}
                        placeholder="exemplo@exemplo.com"
                        type="email"
                        name="email"
                        id="email"
                        onChange={evento => cadastrarUsuario(evento, 'email')} 
                    >
                    </input>
                </div>
                <div className={clsx(classes.inputDiv)}>
                    <label htmlFor="cpf" className={clsx(classes.divLabels)}>CPF</label>
                    <input
                        value={cpf}
                        maxLength="14"
                        required={true}
                        className={clsx("inputs")}
                        placeholder="123.123.123-12"
                        name="cpf"
                        type="text"
                        id="cpf"
                        onChange={evento => cadastrarUsuario(evento, evento.target.name)} 
                    >
                    </input>
                </div>
                <div className={clsx(classes.inputDiv)}>
                    <label htmlFor="senha" className={clsx(classes.divLabels)}>Senha</label>
                    <input
                        value={senha}
                        className={clsx("inputs")}
                        placeholder="Senha com mínimo de 6 caracteres"
                        required={true}
                        type="password"
                        id="senha"
                        name="senha"                           
                        onChange={evento => cadastrarUsuario(evento, evento.target.name)} 
                    >
                    </input>
                </div>
                <div className={clsx(classes.inputDiv)}>
                    <label htmlFor="confirmarsenha" className={clsx(classes.divLabels)}>Confirmar Senha</label>
                    <input
                        value={confirmar_senha}
                        className={clsx("inputs")}
                        placeholder="Senha com mínimo de 6 caracteres"
                        required={true}
                        type="password"
                        id="confirmarsenha"
                        name="confirmarsenha"
                        onChange={evento => cadastrarUsuario(evento, evento.target.name)} 
                    >
                    </input>
                </div>
                <div className={clsx(classes.inputDiv)}>
                    <label htmlFor="cargo" className={clsx(classes.divLabels)}>Cargo</label>
                    <select
                        className={clsx("inputs")}
                        required={true}            
                        onChange={AtualizaCargo}
                        value={novo_cargo}
                        name="cargo"
                        id="cargo"
                        style={{cursor: "pointer", padding: "15px"}}
                    >
                        <option disabled value="Informe seu cargo">
                            Informe seu cargo
                        </option>
                        {
                            cargos.map((cargo) => {
                                return <option key={cargo.id_cargo} value={cargo.id_cargo}>{cargo.nome}</option>
                            })
                        }
                    </select>
                </div>                    
                <button
                    style={{color: "white"}}
                    type="submit"
                    className={clsx("btn")}
                >
                    Cadastrar
                </button>                   
            </form>
            <ToastContainer/>
        </div>
    );
}