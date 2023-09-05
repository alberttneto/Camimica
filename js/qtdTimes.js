var qtdTimes = 2;
var qtdPessoas = 2;

function buscaQtds() {
    qtdTimes = document.getElementsByTagName("input")[0].value;
    qtdPessoas = document.getElementsByTagName("input")[1].value;

    if(qtdTimes < 2 || qtdTimes > 4){
        alert("Quantidade Times invalida!! Tem que ser maior ou igual a 2 e menor ou igual a 4");
    } else if (qtdPessoas < 2){
        alert("Quantidade Pessoas invalida!! Tem que ser maior ou igual a 2.");
    } else{
        window.location.href = `formando-times.html?param1=${qtdTimes}&param2=${qtdPessoas}`;
    }
};
