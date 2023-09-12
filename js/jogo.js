
const parametroTimes = new URLSearchParams(window.location.search);
var timesJSON = JSON.parse(parametroTimes.get('times')); // valor1
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

    const qtdPessoas = timesJSON[0].pessoas.length

    for (let i = 0; i < qtdPessoas; i++) {
        
        indice = Math.floor(Math.random() * time1.length);
        
        novoTime1.push(time1[indice]);
        time1.splice(indice, 1);

        indice = Math.floor(Math.random() * time2.length);

        novoTime2.push(time2[indice]);
        time2.splice(indice, 1);
    }

    timesJSON[0].pessoas = novoTime1;
    timesJSON[1].pessoas = novoTime2;

    return timesJSON;
}


if(configJSON.ordemJogo == "ordemAlt"){
    timesJSON = alteraOrdemJogadores(timesJSON);
}


// Cronometro
const iconTempo = document.querySelector(".fa-clock");
const campoTempo = document.getElementById("tempo");
const tempo = configJSON.tempoMaximoAcerto.split(":");
let cronometro;
let minutos = parseInt(tempo[0]);
let segundos = parseInt(tempo[1]);


function atualizarCronometro() {
    iconTempo.classList.add("fa-spin");
    segundos--;
  
    if (segundos == 0 && minutos > 0) {
      segundos = 59;
      minutos--;
    }else if (minutos == 0 && segundos == 0){
        clearInterval(cronometro);
        iconTempo.classList.remove("fa-spin");
    }
  
    const segundosFormatados = segundos < 10 ? "0" + segundos : segundos;
    const minutosFormatados = minutos < 10 ? "0" + minutos : minutos;
  
    campoTempo.textContent = `${minutosFormatados}:${segundosFormatados}`;
}


const nomeJogador = document.getElementById("nome-jogador");
const campoTipoPalavra = document.getElementById("tipo-palavra");
const campoPalavra = document.getElementById("palavra");
const campoPontuacao = document.getElementById("ponto-rodada");
const campoPulos = document.getElementById("qtd-pulos");

nomeJogador.innerHTML = timesJSON[0].pessoas[0];
campoPulos.innerHTML = configJSON.qtdMaxPulos;

var pulos = configJSON.qtdMaxPulos;

fetchData(tiposPalavras).then((data) => {

    function sorteiaPalavra(){
        var indiceTipo, indicePalavra, tipoPalavra, pontos;
        indiceTipo = Math.floor(Math.random() * data.length);
        tipoPalavra = Object.keys(data[indiceTipo])[0]
        campoTipoPalavra.innerHTML = tipoPalavra
    
        indicePalavra = Math.floor(Math.random() * data[indiceTipo][tipoPalavra].length);
    
        campoPalavra.innerHTML = data[indiceTipo][tipoPalavra][indicePalavra];
    
        if(configJSON.pontosRodadaAleatorio == "valorAlt"){
            pontos =  Math.floor(Math.random() * (parseInt(configJSON.pontosPorRodadaMax) - parseInt(configJSON.pontosPorRodadaMin) + 1) + parseInt(configJSON.pontosPorRodadaMin));
        } else{
            pontos = parseInt(configJSON.pontosPorRodadaMax);
        }
    
        campoPontuacao.innerHTML = "Pontuação: " + pontos;
    };

    sorteiaPalavra();

    const btPulo = document.getElementById("bt-pular")
    btPulo.addEventListener("click", () => {
        pulos--;

        if (pulos >= 0){
            sorteiaPalavra();
            campoPulos.innerHTML = pulos;
        } else{
            // Error
        }

    })

    document.getElementById("bt-iniciar").addEventListener("click", () => {
        cronometro = setInterval(atualizarCronometro, 1000);
        btPulo.setAttribute("disabled", "");
    });





});


