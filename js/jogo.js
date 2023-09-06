
const parametroTimes = new URLSearchParams(window.location.search);
const timesJSON = JSON.parse(parametroTimes.get('times')); // valor1
const configJSON = JSON.parse(parametroTimes.get('config')); // valor1
console.log(timesJSON); 
console.log(configJSON); 

const listaPalavras = localStorage.getItem("listaPalavras");
console.log(listaPalavras); 


// Configurações CSS



// Função que retorna a ordem dos times de forma aleatoria;
function alteraOrdemJogadores(timesJSON){

    var time1 = timesJSON[0].pessoas;
    var time2 = timesJSON[1].pessoas;
    var novoTime1 = [];
    var novoTime2 = [];
    var indice;

    console.log(timesJSON);

    const qtdPessoas = timesJSON[0].pessoas.length

    for (let i = 0; i < qtdPessoas; i++) {
        
        indice = Math.floor(Math.random() * time1.length);
        
        novoTime1.push(time1[indice]);
        time1.splice(indice, 1);

        indice = Math.floor(Math.random() * time2.length);

        novoTime2.push(time2[indice]);
        time2.splice(indice, 1);
    }

    return timesJSON;
}


if(configJSON.ordemJogo == "ordemAlt"){
    timesJSON = alteraOrdemJogadores(timesJSON);
}


