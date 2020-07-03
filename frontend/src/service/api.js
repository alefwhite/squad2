import axios from 'axios';
import { toast } from 'react-toastify';
import retornaToken from '../utils/retornaToken';

const api = axios.create({
    baseURL:"http://localhost:3333",
    headers: {
        "Content-Type":"application/json",
        "Acess-Control-Allow-Origin":"*",
        // "Authorization": "Bearer " + token
    }
});

api.interceptors.request.use(function(config) {
  
    if (retornaToken() != null ) {
      config.headers.Authorization = `Bearer ${retornaToken()}`;
    }
  
    return config;

  }, function(error) {
    return Promise.reject(error);
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
    
    console.error("Error: ", error);

    return Promise.reject(error);
});

export default api;