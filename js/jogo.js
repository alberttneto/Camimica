
// Recebendo variaveis de outras paginas
const parametroTimes = new URLSearchParams(window.location.search);
var timesJSON = JSON.parse(parametroTimes.get('times'));
const configJSON = JSON.parse(parametroTimes.get('config'));
const tiposPalavras = localStorage.getItem("listaPalavras");

//Lendo arquivos com as palavras
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


// Função que retorna a ordem dos times de forma aleatoria;
const qtdPessoas = timesJSON[0].pessoas.length;
const qtdTimes = timesJSON.length;
function alteraOrdemJogadores(timesJSON){

    var time1 = timesJSON[0].pessoas;
    var time2 = timesJSON[1].pessoas;
    var novoTime1 = [];
    var novoTime2 = [];
    var indice;

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

// Inserindo informações no placar
const placar = document.getElementById("placar");

for (let i = 0; i < qtdTimes; i++) {
    const div = document.createElement("div");
    const spanTime = document.createElement("span");
    const spanPontos = document.createElement("span");

    spanTime.innerHTML = timesJSON[i].nome + ": ";
    spanPontos.innerHTML = timesJSON[i].pontos;
    spanPontos.classList.add("span-pontos");
    div.appendChild(spanTime);
    div.appendChild(spanPontos);
    placar.appendChild(div);
}

const iconTempo = document.querySelector(".fa-clock");
const campoTempo = document.getElementById("tempo");
var tempo = configJSON.tempoMaximoAcerto.split(":");
var minutos = parseInt(tempo[0]);
var segundos = parseInt(tempo[1]);

campoTempo.textContent = minutos + ":" + segundos;

const spanPontos = document.getElementsByClassName("span-pontos");
const nomeJogador = document.getElementById("nome-jogador");
const campoTipoPalavra = document.getElementById("tipo-palavra");
const campoPalavra = document.getElementById("palavra");
const campoPontuacao = document.getElementById("ponto-rodada");
const campoPulos = document.getElementById("qtd-pulos");
const modalVencedor = document.getElementById("modal-vencedor");
campoPulos.innerHTML = configJSON.qtdMaxPulos;

var pulos = configJSON.qtdMaxPulos;
var flagPulo = 0;
var indiceTime = 0;
var indicePessoa = 0;
var pontos = 0;
let cronometro;

fetchData(tiposPalavras).then((data) => {

    // Cronometro
    function atualizarCronometro() {
        iconTempo.classList.add("fa-spin");
        segundos--;
      
        if (segundos == 0 && minutos > 0) {
          segundos = 59;
          minutos--;
    
        }else if (minutos == 0 && segundos == 0){
            marcaPonto();
        }
      
        const segundosFormatados = segundos < 10 ? "0" + segundos : segundos;
        const minutosFormatados = minutos < 10 ? "0" + minutos : minutos;
      
        campoTempo.textContent = `${minutosFormatados}:${segundosFormatados}`;
    }

    //Gera pontuação da mimica na rodada
    function geraPontuaçãoPalavra(){

        if(configJSON.pontosRodadaAleatorio == "valorAlt"){
            pontos = Math.floor(Math.random() * (parseInt(configJSON.pontosPorRodadaMax) - parseInt(configJSON.pontosPorRodadaMin) + 1) + parseInt(configJSON.pontosPorRodadaMin));
        } else{
            pontos = parseInt(configJSON.pontosPorRodadaMax);
        }

        campoPontuacao.innerHTML = "Pontuação: " + pontos;
    }

    var indiceTipo, indicePalavra, tipoPalavra;

    function sorteiaPalavra(){

        // Verifica se tem ganhador
        if(fimDeJogo()){
            modalVencedor.classList.remove("ocultar");
        }

        tempo = configJSON.tempoMaximoAcerto.split(":");

        if(!flagPulo){

            minutos = parseInt(tempo[0]);
            segundos = parseInt(tempo[1]);

            nomeJogador.innerHTML = timesJSON[indiceTime].pessoas[indicePessoa];

            if(indiceTime == qtdTimes-1){
                indiceTime = 0;
                indicePessoa++;
            }else{
                indiceTime++;
            }

            if(indicePessoa == qtdPessoas){
                indicePessoa = 0;
            }
        }   
         
        indiceTipo = Math.floor(Math.random() * data.length);
        
        tipoPalavra = Object.keys(data[indiceTipo])[0]
        campoTipoPalavra.innerHTML = tipoPalavra
            
        indicePalavra = Math.floor(Math.random() * data[indiceTipo][tipoPalavra].length);
            
        campoPalavra.innerHTML = data[indiceTipo][tipoPalavra][indicePalavra];

        geraPontuaçãoPalavra();

        flagPulo = 0;
    };

    sorteiaPalavra();
    
    const btPulo = document.getElementById("bt-pular");
    const btIniciar = document.getElementById("bt-iniciar");
    const btParar = document.getElementById("bt-parar");
    const iconAcertou = document.querySelector(".fa-square-check");
    const iconErrou = document.querySelector(".fa-circle-xmark");
    const nomeTimeJogou = document.getElementById("time-jogou");
    const btReiniciar = document.getElementById("reiniciar");
    const btNovoJogo = document.getElementById("novo-jogo");
    const opconfig = document.getElementById("op-config");
    const fecharModalConfig = document.getElementById("fechar-modal-config");
    const modalPontuar = document.getElementById("modal-pontuar");
    const modalConfig = document.getElementById("modal-config");
    
    btPulo.addEventListener("click", () => {
        pulos--;

        if (pulos >= 0){
            flagPulo = 1;
            campoPulos.innerHTML = pulos;
            sorteiaPalavra();
        } else{
            // Error
        }
    })

    btIniciar.addEventListener("click", () => {
        cronometro = setInterval(atualizarCronometro, 1000);
        btPulo.setAttribute("disabled", "");
        btIniciar.classList.add("ocultar");
        btParar.classList.remove("ocultar");
    });

    btParar.addEventListener("click", () => {
        marcaPonto();
    });

    // Função recebe informação de qual time pontuou e salva ponto
    function marcaPonto(){
        clearInterval(cronometro);
        campoTempo.textContent = parseInt(tempo[0]) + ":" + parseInt(tempo[1]);
        pulos = configJSON.qtdMaxPulos;
        campoPulos.innerHTML = configJSON.qtdMaxPulos;
        iconTempo.classList.remove("fa-spin");
        nomeTimeJogou.innerHTML = timesJSON[(indiceTime - 1 + qtdTimes)%qtdTimes].nome;
        modalPontuar.classList.remove("ocultar");
    }

    // Ganhador
    function fimDeJogo(){
        var ganhador;
        var flagGanhador = 0;
        const spanGanhador = document.getElementById("time-ganhador");
        for (let i = 0; i < qtdTimes; i++) {
            if(timesJSON[i].pontos >= configJSON.pontoMaximo){
                ganhador = timesJSON[i].nome;
                flagGanhador = 1;
            }
        }
        spanGanhador.innerHTML = ganhador;
        return flagGanhador;
    }

    iconAcertou.addEventListener("click", () => {
        timesJSON[(indiceTime - 1 + qtdTimes)%qtdTimes].pontos += pontos;
        spanPontos[(indiceTime - 1 + qtdTimes)%qtdTimes].innerHTML = timesJSON[(indiceTime - 1 + qtdTimes)%qtdTimes].pontos;
        modalPontuar.classList.add("ocultar");
        btIniciar.classList.remove("ocultar");
        btParar.classList.add("ocultar");
        btPulo.disabled = false;
        sorteiaPalavra();
    });

    iconErrou.addEventListener("click", () => {
        if(configJSON.pontuaErrosAcertos == "erroAc"){
            for (let i = 0; i < qtdTimes; i++) {
                
                if(i != (indiceTime - 1 + qtdTimes)%qtdTimes){
                    timesJSON[i].pontos += pontos;
                    spanPontos[i].innerHTML = timesJSON[i].pontos
                }
                
            }
        }
        modalPontuar.classList.add("ocultar");
        btIniciar.classList.remove("ocultar");
        btParar.classList.add("ocultar");
        btPulo.disabled = false;
        sorteiaPalavra();
    });

    btNovoJogo.addEventListener("click", () => {
        window.location.href = "palavra.html"
    });

    btReiniciar.addEventListener("click", () => {
        for (let i = 0; i < qtdTimes; i++) {
            timesJSON[i].pontos = 0;
            spanPontos[i].innerHTML = 0;
        }
        modalVencedor.classList.add("ocultar");
    });

    const pontoRodada = document.getElementsByName("tipo-valor");

    for (const op of pontoRodada) {
        op.addEventListener("change", () => {
            const min = document.getElementById("ptRodadaMin");
            if(op.value == "valorFixo"){
                min.disabled = true;
                configJSON.pontosRodadaAleatorio = op.value
            }else{
                min.disabled = false;
                configJSON.pontosRodadaAleatorio = op.value
            }
        });
    }


    opconfig.addEventListener("click", () => {
        modalConfig.classList.remove("ocultar");
    });
    
    fecharModalConfig.addEventListener("click", () => {

        const tipoPontuacao = document.querySelector('input[name="forma-pontuar"]:checked');
        const pontoMax = document.querySelector('input[name="ptMax"]');
        const pontoRodadaMax = document.querySelector('input[name="ptRodadaMx"]');
        const pontoRodadaMin = document.querySelector('input[name="ptRodadaMin"]');
        const tempoMax = document.querySelector('input[name="tempoMinutos"]').value + ":" + document.querySelector('input[name="tempoSegundos"]').value;
        const qtdPulos = document.querySelector('input[name="qtdPulos"]');   

        minutos = parseInt(tempoMax.split(":")[0]);
        segundos = parseInt(tempoMax.split(":")[1]);  
        campoTempo.textContent = minutos + ":" + segundos;

        configJSON.tempoMaximoAcerto = tempoMax;
        configJSON.pontuaErrosAcertos = tipoPontuacao.value;
        configJSON.pontoMaximo = pontoMax.value;
        
        configJSON.pontosPorRodadaMin = pontoRodadaMin.value;
        configJSON.pontosPorRodadaMax = pontoRodadaMax.value;
        geraPontuaçãoPalavra();

        configJSON.qtdMaxPulos = qtdPulos.value;
        pulos = qtdPulos.value;
        campoPulos.innerHTML = pulos;
        modalConfig.classList.add("ocultar");
    });

});


