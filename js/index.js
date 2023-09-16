const img = document.getElementById("pessoas");

var index = 0;
var cronometro;

function atualizaPersonagem(){

    if(index == 7){
        index = 0;
    }
    img.setAttribute("src", "img/pessoas/person" + (index+1) +".png");
    index++;
}

cronometro = setInterval(atualizaPersonagem, 1000);

const button = document.getElementById("comecar");

button.addEventListener("click", () =>{
    clearInterval(cronometro);
    window.location.href = "palavra.html";
});