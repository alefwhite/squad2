//// Define a constante usuarioAutenticado que verifica se há um token no localstorage
export const usuarioAutenticado = () => localStorage.getItem("token") !== null;