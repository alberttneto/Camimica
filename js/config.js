const parametroTimes = new URLSearchParams(window.location.search);
const timesJSON = parametroTimes.get('dados'); // valor1
console.log(timesJSON); 

const listaPalavras = localStorage.getItem("listaPalavras");
console.log(listaPalavras); 



const pontoRodada = document.querySelector('input[name="pontos-rodada"]');
console.log(pontoRodada);
for (const op of pontoRodada) {
    op.addEventListener("change", () => {
        console.log(op);
    });
    
}



//const dadosConfig = new Config();
const jogar = document.getElementById("play");

jogar.addEventListener("click", () => {

    const ordemJg = document.querySelector('input[name="opOrdem"]:checked');
    const pontoMax = document.querySelector('input[name="ptMax"]');
    const pontoRodada = document.querySelector('input[name="pontos-rodada"]:checked');
    const pontoRodadaMax = document.querySelector('input[name="ptRodadaMx"]');
    const pontoRodadaMin = document.querySelector('input[name="ptRodadaMin"]');
    const tipoPontuacao = document.querySelector('input[name="forma-pontuar"]:checked');
    const tempoMax = document.querySelector('input[name="tempoMx"]');
    const qtdPulos = document.querySelector('input[name="qtdPulos"]');

    console.log(ordemJg.value);
    console.log(pontoMax.value);
    console.log(pontoRodada.value);
    console.log(pontoRodadaMax.value);
    console.log(pontoRodadaMin.value);
    console.log(tipoPontuacao.value);
    console.log(tempoMax.value);
    console.log(qtdPulos.value);
    

    const dadosConfig = new Config(ordemJg.value, pontoMax.value, pontoRodada.value, pontoRodadaMin.value, pontoRodadaMax.value, tipoPontuacao.value, tempoMax.value, qtdPulos.value);

    console.log(dadosConfig);
    



    // dadosConfig.setOrdemJogo(ordemJg.value);



});
