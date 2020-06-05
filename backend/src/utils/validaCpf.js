export default (cpfUsuario) => {
    let Resultado = false;
    let CpfCalculo = "";

    let Resto = 0, Calculo = 0;

    const V1 = [10, 9, 8, 7, 6, 5, 4, 3, 2];
    const V2 = [11, 10, 9, 8, 7, 6, 5, 4, 3, 2];

    let Digito_Verificador = "";
    let Digito_VerificadorDois = "";    

    // Retira os caracteres especiais
    cpfUsuario = cpfUsuario.replace(".", "");
    cpfUsuario = cpfUsuario.replace(".", "");
    cpfUsuario = cpfUsuario.replace(" ", "");
    cpfUsuario = cpfUsuario.replace("-", "");
    
    if(cpfUsuario.length < 11) {
        return {valido: Resultado};
    }
   

    // Retorna apenas os 8 primeiros digitos do cpf passado por parametro
    CpfCalculo = cpfUsuario.substring(0, 9);
    for(let i = 0; i <= 8; i++) {
        Calculo += Number(CpfCalculo[i].toString()) * V1[i]; 
    }

    Resto = Calculo % 11;
    Calculo = 11 - Resto;

    if(Calculo > 9) {
        Digito_Verificador = "0";
    } else {
        Digito_Verificador = Calculo.toString();
    }

    if(Digito_Verificador == cpfUsuario[9].toString()) {
        Resultado = true;
    }

    Resto = 0;

    CpfCalculo = CpfCalculo + Calculo;
    Calculo = 0;

    for(let i = 0; i <=9; i++) {
        Calculo += Number(CpfCalculo[i].toString()) * V2[i];
    }

    Resto = Calculo % 11;
    Calculo = 11 - Resto;

    if(Calculo > 9) {
        Digito_VerificadorDois = "0";
    } else {
        Digito_VerificadorDois = Calculo.toString()
    }


    if(Digito_VerificadorDois == cpfUsuario[10].toString()) {
        Resultado = true;
    } else {
        Resultado = false;
    }

    return {valido: Resultado, cpfUsuario};
};

