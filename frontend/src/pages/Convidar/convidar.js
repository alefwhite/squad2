import React, { useState, useEffect} from 'react'
import api from '../../service/api';
import './convidar.css';
import EmailIcon from '@material-ui/icons/Email';
import { toast } from 'react-toastify';

const Convidar = () => {
    const [link, setLink] = useState("");
    const [emailConvite, setEmailConvite] = useState("");

    const LinkDeConvite = async () => {
        const retorno = await api.get('/convite');

        if(retorno.status === 200) {
            setLink(retorno.data.url);
        }
    };
    
    const enviarConvite = async (e) => {
        e.preventDefault();

        let data = {
            email: emailConvite
        };

        const retorno = await api.post('/convidar', data);

        if(retorno.status === 200) {
            toast.success(retorno.data.mensagem);
        };
    };

    useEffect(() => {
        LinkDeConvite();
    }, []);

    return (
        <>  
            <div className="cardConvidar">
                <form onSubmit={enviarConvite}>
                    <div className="cardConteudo">
                        <h1 className="titleConvidar">Convidar Usuário</h1>
                        <div style={{width: "100%"}}>
                            <h2 className="titleLink">Link de Convite: <span style={{color: "#7A57EA",}}>{link}</span></h2>
                        </div>
                        <div className="inputDiv">
                                <div className="inputDivCont">
                                    <label htmlFor="email" className="divLabels">E-mail</label>
                                    <input
                                        value={emailConvite}
                                        className="inputsConvidar"
                                        required={true}
                                        placeholder="exemplo@exemplo.com"
                                        type="email"
                                        name="email"
                                        id="email"
                                        onChange={e => setEmailConvite(e.target.value)} 
                                    >
                                    </input>
                                </div>
                                <button
                                    style={{color: "white", display: "flex", justifyContent: "center", alignItems: "center", padding: "0"}}
                                    type="submit"
                                    className="btnConvidar"
                                >   
                                    <EmailIcon style={{marginRight: "5px", marginBottom: "2px"}}/>
                                    Enviar
                                </button>     
                        </div>

                        <div>

                        </div>
                    </div> 
                </form>                
            </div>
        </>
    )
}

export default Convidar;