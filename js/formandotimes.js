
const parametros = new URLSearchParams(window.location.search);
const qtdTimes = parametros.get('param1'); // valor1
const qtdPessoas = parametros.get('param2'); // valor2

const divTimes = document.getElementById("forma-times");

for (let index = 0; index < qtdTimes; index++) {

    const div = document.createElement("div");
    const inputTime = document.createElement("input");
    inputTime.classList.add("nome-time");
    inputTime.setAttribute("placeholder", "Nome do Time " + (index+1));
    div.appendChild(inputTime);

    for (let index = 0; index < qtdPessoas; index++) {

        const input = document.createElement("input");
        input.setAttribute("type", "text");
        input.setAttribute("placeholder", "Nome Jogador " + (index+1));
        input.classList.add("nome-jogadores");
        div.appendChild(input);
    }
    
    divTimes.appendChild(div);
}


var times = [];
var qtdNomes = parseInt(qtdPessoas);


const prosseguir = document.getElementById("prosseguir");


function montaTimes(){

    const nomeTime = document.getElementsByClassName("nome-time");
    const nomes = document.getElementsByClassName("nome-jogadores");
    flagAlerta = 0;

    for (let i = 0; i < nomeTime.length; i++) {

        if(nomeTime[i].value == "" && flagAlerta == 0){
            alert("Inserir nome do time");
            flagAlerta = 1;
        }else{
            var time = new Times(nomeTime[i].value);
        }
        for (let j = i*qtdNomes; j < i*qtdNomes+qtdNomes; j++) {
            if(nomes[j].value == "" && flagAlerta == 0){
                alert("Inserir nome de todos os integrantes do time");
                flagAlerta =1;
            }else{
                time.pessoas.push(nomes[j].value);
            }
        }
        times.push(time);
    }
    
    const parametroConsulta = encodeURIComponent(JSON.stringify(times));

    if(flagAlerta == 0){
        window.location.href = `config.html?dados=${parametroConsulta}`;
    }
};

