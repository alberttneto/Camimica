class Config{

    ordemJogo = "";
    pontoMaximo = 0;
    pontosRodadaAleatorio = true;
    pontosPorRodadaMin = 1;
    pontosPorRodadaMax = 1;
    pontuaErrosAcertos = false;
    tempoMaximoAcerto = "0:60";
    qtdMaxPulos = 0;

    constructor(ordemJogo, pontoMaximo, pontosRodadaAleatorio, pontosPorRodadaMin, pontosPorRodadaMax, pontuaErrosAcertos, tempoMaximoAcerto, qtdMaxPulos){

        this.ordemJogo = ordemJogo;
        this.pontoMaximo = pontoMaximo;
        this.pontosRodadaAleatorio = pontosRodadaAleatorio;
        this.pontosPorRodadaMin = pontosPorRodadaMin;
        this.pontosPorRodadaMax = pontosPorRodadaMax;
        this.pontuaErrosAcertos = pontuaErrosAcertos;
        this.tempoMaximoAcerto = tempoMaximoAcerto;
        this.qtdMaxPulos = qtdMaxPulos;
    }

    setOrdemJogo(ordemJogo){
        this.ordemJogo = ordemJogo;
    }

    setPontoMaximo(pontoMaximo){
        this.pontoMaximo = pontoMaximo;
    }

    setpontosRodadaAleatorio(pontosRodadaAleatorio){
        this.pontosRodadaAleatorio = pontosRodadaAleatorio;
    }

    setPontosRodadaMin(pontosPorRodadaMin){
        this.pontosPorRodadaMin = pontosPorRodadaMin;
    }

    setPontosRodadaMax(pontosPorRodadaMax){
        this.pontosPorRodadaMax = pontosPorRodadaMax;
    }

    setPontuaErrosAcertos(pontuaErrosAcertos){
        this.pontuaErrosAcertos = pontuaErrosAcertos;
    }

    setTempoMaximoAcerto(tempoMaximoAcerto){
        this.tempoMaximoAcerto = tempoMaximoAcerto;
    }

    setqtdMaxPulos(qtdMaxPulos){
        this.qtdMaxPulos = qtdMaxPulos;
    }
   


}
