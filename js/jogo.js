
const parametroTimes = new URLSearchParams(window.location.search);
const timesJSON = JSON.parse(parametroTimes.get('times')); // valor1
const configJSON = JSON.parse(parametroTimes.get('config')); // valor1
console.log(timesJSON); 
console.log(configJSON); 

const tiposPalavras = localStorage.getItem("listaPalavras");
console.log(tiposPalavras); 


async function fetchData(palavras) {
    try {

        palavras = palavras.split(",");
        listaPalavras = [];
        
        for (let i = 0; i < palavras.length; i++) {
            const response = await fetch("palavras/"+ palavras[i]+"JSON.json");
            const responseData = await response.json();
            listaPalavras[i] = responseData
        }

        return listaPalavras;

    } catch (error) {
        console.error('Erro:', error);
    }
}



// Configurações CSS
const opConfig = document.getElementById("op-config");
const iconConfig = document.querySelector(".fa-gear");

opConfig.addEventListener("mouseenter", () => {
    iconConfig.classList.add("fa-flip");
});

opConfig.addEventListener("mouseleave", () => {
    iconConfig.classList.remove("fa-flip");
});


const opPlacar = document.getElementById("op-placar");
const iconPlacar = document.querySelector(".fa-bars");

opPlacar.addEventListener("mouseenter", () => {
    iconPlacar.classList.add("fa-flip");
});

opPlacar.addEventListener("mouseleave", () => {
    iconPlacar.classList.remove("fa-flip");
});

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

const nomeJogador = document.getElementById("nome-jogador");
const tipoPalavra = document.getElementById("tipo-palavra");
nomeJogador.innerHTML = timesJSON[0].pessoas[0];
// tipoPalavra.innerHTML = 

fetchData(tiposPalavras).then((data) => {

    console.log(data.length)
    for (let i = 0; i < data.length; i++) {

    }
    indice = Math.floor(Math.random() * time2.length);
});

