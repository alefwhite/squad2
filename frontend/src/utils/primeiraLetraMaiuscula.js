export default (palavra) => {
    let nome = palavra.toString();
    let m = nome[0].toUpperCase();
  
    return nome.replace(nome[0], m)

};