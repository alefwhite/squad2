import axios from 'axios';
import { toast } from 'react-toastify';

const token = localStorage.getItem("token");

const api = axios.create({
    baseURL:"http://localhost:3333",
    headers: {
        "Content-Type":"application/json",
        "Acess-Control-Allow-Origin":"*",
        "Authorization": "Bearer " + token
    }
});

api.interceptors.response.use((response) => {
    console.log("Response Interceptor:  ", response);
    
    return response;
}, error => {
    const { mensagem } = error.response.data;
    
    if(error.response.status === 400) {       
        return toast.error(mensagem);
    } else if (error.response.status === 401) {       
        return toast.error(mensagem);
    }

    return Promise.reject(error);
});

export default api;