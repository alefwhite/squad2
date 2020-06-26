import axios from 'axios';

const api = axios.create({
    baseURL:"http://localhost:3333",
    headers: {
        "Content-Type":"application/json",
        "Acess-Control-Allow-Origin":"*",
        "Authorization": "Bearer " + localStorage.getItem("token")
    }
})

export default api;