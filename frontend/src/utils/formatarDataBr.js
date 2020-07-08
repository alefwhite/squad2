export default (data) => {
    //Ex 2020-10-06 Para 10/06/2020
    const ano = data.split("-")[0];
    const mes = data.split("-")[1];
    const dia = data.split("-")[2];
    
    // const dataFormatada = dia + '/' + ("0"+mes).slice(-2) + '/' + ("0"+ano).slice(-2);
    const dataFormatada = `${dia}/${mes}/${ano}`;

    return dataFormatada;
};