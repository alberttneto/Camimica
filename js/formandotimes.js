
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

    for (let i = 0; i < nomeTime.length; i++) {

        var time = new Times(nomeTime[i].value);
        for (let j = i*qtdNomes; j < i*qtdNomes+qtdNomes; j++) {
            time.pessoas.push(nomes[j].value);
        }
        times.push(time);
    }
    
    const parametroConsulta = encodeURIComponent(JSON.stringify(times));
    // window.location.href = `config.html?dados=${parametroConsulta}`;
};

