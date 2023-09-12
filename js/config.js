const parametroTimes = new URLSearchParams(window.location.search);
const timesJSON = parametroTimes.get('dados');


const pontoRodada = document.getElementsByName("tipo-valor");

for (const op of pontoRodada) {
    op.addEventListener("change", () => {
        const min = document.getElementById("ptRodadaMin");
        if(op.value == "valorFixo"){
            const min = document.getElementById("ptRodadaMin");
            min.disabled = true;
        }else{
            min.disabled = false;
        }
    });
}


const jogar = document.getElementById("play");

jogar.addEventListener("click", () => {

    const ordemJg = document.querySelector('input[name="opOrdem"]:checked');
    const pontoMax = document.querySelector('input[name="ptMax"]');
    const pontoRodada = document.querySelector('input[name="tipo-valor"]:checked');
    const pontoRodadaMax = document.querySelector('input[name="ptRodadaMx"]');
    const pontoRodadaMin = document.querySelector('input[name="ptRodadaMin"]');
    const tipoPontuacao = document.querySelector('input[name="forma-pontuar"]:checked');
    const tempoMax = document.querySelector('input[name="tempoMinutos"]').value + ":" + document.querySelector('input[name="tempoSegundos"]').value;
    const qtdPulos = document.querySelector('input[name="qtdPulos"]');    

    console.log(tempoMax);

    const dadosConfig = new Config(ordemJg.value, parseInt(pontoMax.value), pontoRodada.value, parseInt(pontoRodadaMin.value), parseInt(pontoRodadaMax.value), tipoPontuacao.value, tempoMax, parseInt(qtdPulos.value));

    const parametroConsulta = encodeURIComponent(JSON.stringify(dadosConfig));

    window.location.href = `jogo.html?times=${timesJSON}&config=${parametroConsulta}`;
});
