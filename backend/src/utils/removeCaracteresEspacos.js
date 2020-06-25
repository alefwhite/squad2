export default (palavra) => {
    return palavra.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/( )+/g, "");    
};